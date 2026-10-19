import { randomUUID } from 'node:crypto';
import { watchlists, watchlistEntries } from '../data/store.js';

let count = watchlistEntries.length + 1

// GET /api/watchlist-entries
// Get all anime entries
export function getAllEntries(req, res) {
    res.status(200).json(watchlistEntries);
}

// GET /api/watchlist-entries/:id
// Get one anime entry by ID
export function getEntryById(req, res, next) {
    const entry = watchlistEntries.find(
        (item) => item._id === req.params.id
    );

    if (!entry) {
        const err = new Error('Watchlist entry not found');
        err.status = 404;
        err.details = {id: req.params.id};
        return next(err);
    }

    res.status(200).json(entry);
}

// POST /api/watchlist-entries
// Add an anime to a watchlist
export function createEntry(req, res, next) {
    const {
        watchlistId,
        malId,
        title,
        imageUrl = '',
        totalEpisodes = 0,
        currentEpisode = 0,
        status = 'Plan to Watch',
        score = 0
    } = req.body;

    const watchlistExists = watchlists.some(
        (item) => item._id === watchlistId
    );
    
    const entryExists = watchlistEntries.some(
        (item) => item.malId === malId && item.watchlistId === watchlistId
    );

    if (!watchlistExists) {
        const err = new Error('A valid watchlistId is required');
        err.status = 400;
        err.details = {watchlistId: watchlistId};
        return next(err);
    }
    
    // Check for duplicate watchlist entries in the same watchlist
    if (entryExists) {
        const err = new Error(`This entry already exists in watchlist`);
        err.status = 409;
        err.details = {watchlistId: watchlistId, malId};
        return next(err);
    }

    const newEntry = {
        _id: count.toString(),
        watchlistId,
        malId,
        title,
        imageUrl,
        totalEpisodes,
        currentEpisode,
        status,
        score
    };

    watchlistEntries.push(newEntry);
    
    count++;
    res.status(201).json(newEntry);
}

// PUT /api/watchlist-entries/:id
// Update an anime entry
export function updateEntry(req, res, next) {
    const index = watchlistEntries.findIndex(
        (item) => item._id === req.params.id
    );

    if (index === -1) {
        
        const err = new Error('Watchlist entry not found');
        err.status = 404;
        err.details = {id: req.params.id};
        return next(err);
    }

    const {
        watchlistId,
        malId,
        title,
        imageUrl,
        totalEpisodes,
        currentEpisode,
        status,
        score
    } = req.body;

    if (watchlistId !== undefined) {
        const watchlistExists = watchlists.some(
            (item) => item._id === watchlistId
        );

        if (!watchlistExists) {
            const err = new Error('A valid watchlistId is required');
            err.status = 404;
            err.details = {watchlistId: watchlistId};
            return next(err);
        }
    }

    watchlistEntries[index] = {
        ...watchlistEntries[index],
        ...(watchlistId !== undefined && { watchlistId }),
        ...(malId !== undefined && { malId }),
        ...(title !== undefined && { title }),
        ...(imageUrl !== undefined && { imageUrl }),
        ...(totalEpisodes !== undefined && { totalEpisodes }),
        ...(currentEpisode !== undefined && { currentEpisode }),
        ...(status !== undefined && { status }),
        ...(score !== undefined && { score })
    };

    res.status(200).json(watchlistEntries[index]);
}

// DELETE /api/watchlist-entries/:id
// Remove an anime entry
export function deleteEntry(req, res, next) {
    const index = watchlistEntries.findIndex(
        (item) => item._id === req.params.id
    );

    if (index === -1) {
        const err = new Error('Watchlist entry not found');
        err.status = 404;
        err.details = {id: req.params.id};
        return next(err);
    }

    watchlistEntries.splice(index, 1);

    res.status(204).end();
}