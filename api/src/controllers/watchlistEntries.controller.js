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

    const changes = {};

    if (watchlistId !== undefined) {
        // A bad watchlistId in the body is invalid input (400), not a missing entry (404).
        if (!mongoose.isValidObjectId(watchlistId)) {
            throw new HttpError(400, 'Validation failed', {
                watchlistId: 'A valid watchlistId is required'
            });
        }

        const watchlist = await Watchlist.findById(watchlistId);

        if (!watchlist) {
            throw new HttpError(404, 'Watchlist not found', { watchlistId });
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

    // Check episode numbers using both existing and updated values.
    const finalTotalEpisodes = totalEpisodes !== undefined
        ? totalEpisodes
        : entry.totalEpisodes;

    const finalCurrentEpisode = currentEpisode !== undefined
        ? currentEpisode
        : entry.currentEpisode;

    if (
        finalTotalEpisodes > 0 &&
        finalCurrentEpisode > finalTotalEpisodes
    ) {
        throw new HttpError(400, 'Validation failed', {
            currentEpisode: 'Current episode cannot exceed total episodes'
        });
    }

    // sanitizeFilter treats any { $...: } object as a plain value, so $ne must be marked trusted.
    // Safe here: our code builds the object, and id was already checked to be a valid ObjectId.
    const entryExists = await WatchlistEntry.findOne({
        _id: mongoose.trusted({ $ne: id }),
        watchlistId: changes.watchlistId ?? entry.watchlistId,
        malId: changes.malId ?? entry.malId
    });

    if (entryExists) {
        throw new HttpError(409, 'This entry already exists in watchlist', {
            watchlistId: changes.watchlistId ?? entry.watchlistId,
            malId: changes.malId ?? entry.malId
        });
    }

    const updatedEntry = await WatchlistEntry.findByIdAndUpdate(
        id,
        changes,
        {
            returnDocument: 'after',
            runValidators: true
        }
    ).populate('watchlistId');

    if (!updatedEntry) {
        throw new HttpError(404, 'Watchlist entry not found', { id });
    }

    res.status(200).json(updatedEntry);
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