import mongoose from 'mongoose';
import { HttpError } from '../lib/httpError.js';
import Watchlist from '../models/Watchlist.js';
import WatchlistEntry from '../models/WatchlistEntry.js';

// GET /api/watchlist-entries
// Get all anime entries
export async function getAllEntries(req, res) {
    const entries = await WatchlistEntry.find()
        .populate('watchlistId');

    res.status(200).json(entries);
}

// GET /api/watchlist-entries/:id
// Get one anime entry by ID
export async function getEntryById(req, res) {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
        throw new HttpError(404, 'Watchlist entry not found', { id });
    }

    const entry = await WatchlistEntry.findById(id)
        .populate('watchlistId');

    if (!entry) {
        throw new HttpError(404, 'Watchlist entry not found', { id });
    }

    res.status(200).json(entry);
}

// POST /api/watchlist-entries
// Add an anime to a watchlist
export async function createEntry(req, res) {
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

    if (!mongoose.isValidObjectId(watchlistId)) {
        throw new HttpError(400, 'A valid watchlistId is required', {
            watchlistId
        });
    }

    const watchlist = await Watchlist.findById(watchlistId);

    if (!watchlist) {
        throw new HttpError(400, 'A valid watchlistId is required', {
            watchlistId
        });
    }

    const entryExists = await WatchlistEntry.findOne({
        watchlistId,
        malId
    });

    if (entryExists) {
        throw new HttpError(409, 'This entry already exists in watchlist', {
            watchlistId,
            malId
        });
    }

    const newEntry = await WatchlistEntry.create({
        watchlistId,
        malId,
        title,
        imageUrl,
        totalEpisodes,
        currentEpisode,
        status,
        score
    });

    await newEntry.populate('watchlistId');

    res.status(201).json(newEntry);
}

// PUT /api/watchlist-entries/:id
// Update an anime entry
export async function updateEntry(req, res) {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
        throw new HttpError(404, 'Watchlist entry not found', { id });
    }

    const entry = await WatchlistEntry.findById(id);

    if (!entry) {
        throw new HttpError(404, 'Watchlist entry not found', { id });
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
        if (!mongoose.isValidObjectId(watchlistId)) {
            throw new HttpError(404, 'A valid watchlistId is required', {
                watchlistId
            });
        }

        const watchlist = await Watchlist.findById(watchlistId);

        if (!watchlist) {
            throw new HttpError(404, 'A valid watchlistId is required', {
                watchlistId
            });
        }

        entry.watchlistId = watchlistId;
    }

    if (malId !== undefined) entry.malId = malId;
    if (title !== undefined) entry.title = title;
    if (imageUrl !== undefined) entry.imageUrl = imageUrl;
    if (totalEpisodes !== undefined) entry.totalEpisodes = totalEpisodes;
    if (currentEpisode !== undefined) entry.currentEpisode = currentEpisode;
    if (status !== undefined) entry.status = status;
    if (score !== undefined) entry.score = score;

    const entryExists = await WatchlistEntry.findOne({
        _id: { $ne: id },
        watchlistId: entry.watchlistId,
        malId: entry.malId
    });

    if (entryExists) {
        throw new HttpError(409, 'This entry already exists in watchlist', {
            watchlistId: entry.watchlistId,
            malId: entry.malId
        });
    }

    await entry.save();
    await entry.populate('watchlistId');

    res.status(200).json(entry);
}

// DELETE /api/watchlist-entries/:id
// Remove an anime entry
export async function deleteEntry(req, res) {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
        throw new HttpError(404, 'Watchlist entry not found', { id });
    }

    const entry = await WatchlistEntry.findByIdAndDelete(id);

    if (!entry) {
        throw new HttpError(404, 'Watchlist entry not found', { id });
    }

    res.status(204).end();
}