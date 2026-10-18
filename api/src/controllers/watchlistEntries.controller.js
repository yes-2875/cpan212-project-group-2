import { randomUUID } from 'node:crypto';
import { watchlists, watchlistEntries } from '../data/store.js';

// GET /api/watchlist-entries
// Get all anime entries
export function getAllEntries(req, res) {
    res.status(200).json(watchlistEntries);
}

// GET /api/watchlist-entries/:id
// Get one anime entry by ID
export function getEntryById(req, res) {
    const entry = watchlistEntries.find(
        (item) => item._id === req.params.id
    );

    if (!entry) {
        return res.status(404).json({
            error: { message: 'Watchlist entry not found' }
        });
    }

    res.status(200).json(entry);
}

// POST /api/watchlist-entries
// Add an anime to a watchlist
export function createEntry(req, res) {
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

    if (!watchlistExists) {
        return res.status(400).json({
            error: { message: 'A valid watchlistId is required' }
        });
    }

    const newEntry = {
        _id: randomUUID(),
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

    res.status(201).json(newEntry);
}

// PUT /api/watchlist-entries/:id
// Update an anime entry
export function updateEntry(req, res) {
    const index = watchlistEntries.findIndex(
        (item) => item._id === req.params.id
    );

    if (index === -1) {
        return res.status(404).json({
            error: { message: 'Watchlist entry not found' }
        });
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
            return res.status(400).json({
                error: { message: 'A valid watchlistId is required' }
            });
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
export function deleteEntry(req, res) {
    const index = watchlistEntries.findIndex(
        (item) => item._id === req.params.id
    );

    if (index === -1) {
        return res.status(404).json({
            error: { message: 'Watchlist entry not found' }
        });
    }

    watchlistEntries.splice(index, 1);

    res.status(204).end();
}