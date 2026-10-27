// Initialize a new Map object to use as a cache
const cache = new Map();
const CACHE_TIMEOUT_MS = 60000; // 60 seconds cache expiry

export async function searchAnime(req, res, next) {
    const query = req.query.q;
    
    if (!query) {
        throw new HttpError(400, 'Validation failed', {q: 'Query parameter q is required'});
    }
    
    const cacheKey = `anime_search_${query}`;
    const now = Date.now();
    
    if (cache.has(cacheKey)) {
        const cachedResult = cache.get(cacheKey);
        
        if (cachedResult.expiresAt > now) {
            
            // Log cache hit to terminal and return cached item
            console.log(`[Cache Hit] Serving external API data from cache for ${query}`);
            return res.status(200).json({
                data: cachedResult.data,
                meta: { cached: true, fetchedAt: cachedResult.fetchedAt }
            });
        } else {
            cache.delete(cacheKey); // Delete cached item if it's expired
        }
    }
    
    
    // Try-catch to fetch with AbortSignal timeout, add result to Map cache if not already there
    try {
        const url = `https://jikan.lucashdo.com/v1/anime?q=${encodeURIComponent(query)}`
        const response = await fetch(url, {signal: AbortSignal.timeout(4000)});
        
        if (!response.ok) {
            throw new HttpError(502, 'jikan-edge API responded with an error', {upstreamStatus: response.status});
        }
        
        const rawData = await response.json();
        
        // Create our own simplified JSON shape to return from external API
        const simplified = (rawData.data || []).map(anime => ({
            id: anime.malId,
            title: anime.title,
            imageUrl: anime.imageUrl || null,
            episodes: anime.episodes,
            score: anime.score,
            year: anime.year,
            synopsis: anime.synopsis,
        }));
        
        // Add item to cache
        cache.set(cacheKey, {
            data: simplified,
            expiresAt: now + CACHE_TIMEOUT_MS,
            fetchedAt: new Date().toISOString()
        });
        
        // Return data and meta
        return res.status(200).json({
            data: simplified,
            meta: { cached: false, fetchedAt: new Date().toISOString() }
        });
        
    } catch (err) {
        
        // Don't keep HttpErrors trapped in the try-catch loop, throw them to the error handler
        if (err instanceof HttpError) {
            throw err;
        }
        
        // Log API timeout error if the request was timed out, pass onto error handler
        if (err.name === 'AbortError' || err.name === 'TimeoutError') {
            throw new HttpError(504, 'External API request timed out', {timeoutMs: 4000});
        }
        
        // Log error if the JSON response was invalid
        if (err.name === 'SyntaxError') {
            throw new HttpError(502, `Failed to fetch External API: Not JSON (${err.message})`);
        }
        
        // Throw error for network failures (no response, unknown host, refused connection, no network)
        if (err.name === 'TypeError' && err.message === 'fetch failed') {
            throw new HttpError(502, `Network failoure on jikan-edge API: ${err.cause}`);
        }
        
        // Log general error if the request was not timed out
        const apiErr = new Error('Failed to connect to jikan-edge API');
        apiErr.status = 502;
        apiErr.details = {message: err.message}
        return next(apiErr);
    }
}