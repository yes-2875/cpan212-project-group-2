// Initialize a new Map object to use as a cache
const cache = new Map();
const CACHE_TIMEOUT_MS = 60000; // 60 seconds cache expiry

export function searchAnime(req, res, next) {
    const query = req.query.q;
    const cacheKey = `anime_${query}`;
    const now = Date.now();
    
    
    const url = `https://jikan.lucashdo.com/v1/anime?q=${encodeURIComponent(query)}`
}