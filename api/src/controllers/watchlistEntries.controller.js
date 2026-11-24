import mongoose from 'mongoose';
import { HttpError } from '../lib/httpError.js';
import Watchlist from '../models/Watchlist.js';
import WatchlistEntry, { ENTRY_FIELDS } from '../models/WatchlistEntry.js';
import { pickFields } from '../lib/pickFields.js';

// GET /api/watchlist-entries?status=&watchlistId=&q=&sort=&page=&limit=
// Get one page of anime entries, filtered and sorted.
// The query string was already checked by parseEntryListQuery (middleware/entryListQuery.js).
export async function getAllEntries(req, res) {
    const { filter, sort, page, limit } = res.locals.listQuery;

    // Two queries at once: one page of entries, and how many entries match in total.
    // Sort comes before skip/limit so pages are stable. countDocuments uses the same filter.
    const [entries, total] = await Promise.all([
        WatchlistEntry.find(filter)
            .sort(sort)
            .skip((page - 1) * limit)
            .limit(limit)
            .populate('watchlistId'),
        WatchlistEntry.countDocuments(filter)
    ]);

    // A page past the end isn't an error: data is just empty.
    res.status(200).json({
        data: entries,
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
    });
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

// Throws a 400 if watchlistId doesn't match a real watchlist.
// It's a field in the request body, so it's bad input (400), not a missing resource (404).
async function requireWatchlistExists(watchlistId) {
    const exists = await Watchlist.exists({ _id: watchlistId });

    if (!exists) {
        throw new HttpError(400, 'Validation failed', {
            watchlistId: 'No watchlist exists with this id'
        });
    }
}

// Throws a 409 if another entry in the same watchlist already has this malId.
// excludeId skips the entry being updated, so it doesn't count as its own duplicate.
async function rejectDuplicate(entry, excludeId) {
    const filter = { watchlistId: entry.watchlistId, malId: entry.malId };
    if (excludeId) {
        // sanitizeFilter treats any { $...: } object as a plain value, so $ne must be marked trusted.
        // Safe here: our code builds the object from an id that was already checked.
        filter._id = mongoose.trusted({ $ne: excludeId });
    }

    if (await WatchlistEntry.exists(filter)) {
        throw new HttpError(409, 'This entry already exists in watchlist', {
            watchlistId: entry.watchlistId,
            malId: entry.malId
        });
    }
}

// POST /api/watchlist-entries
// Add an anime to a watchlist
export async function createEntry(req, res) {
    // Unsent fields get the schema's defaults (status "Plan to Watch", score 0, ...).
    const entry = new WatchlistEntry(pickFields(req.body, ENTRY_FIELDS));

    // Check the schema rules before any database lookups, so bad input gets one 400
    // listing every problem, and never reaches a query that would fail on it.
    await entry.validate();

    await requireWatchlistExists(entry.watchlistId);
    await rejectDuplicate(entry);

    await entry.save();
    await entry.populate('watchlistId');

    res.location('/api/watchlist-entries/' + entry._id);
    res.status(201).json(entry);
}

// PUT /api/watchlist-entries/:id
// Update an anime entry
export async function updateEntry(req, res) {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
        throw new HttpError(404, 'Watchlist entry not found', { id });
    }

    const changes = pickFields(req.body, ENTRY_FIELDS);

    if (Object.keys(changes).length === 0) {
        throw new HttpError(400, 'Validation failed', {
            body: 'Provide at least one field to update'
        });
    }

    const entry = await WatchlistEntry.findById(id);

    if (!entry) {
        throw new HttpError(404, 'Watchlist entry not found', { id });
    }

    // Apply the changes, then check the whole entry against the schema rules,
    // e.g. a new totalEpisodes lower than the current episode is caught here.
    entry.set(changes);
    await entry.validate();

    if (changes.watchlistId !== undefined) {
        await requireWatchlistExists(entry.watchlistId);
    }
    await rejectDuplicate(entry, entry._id);

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