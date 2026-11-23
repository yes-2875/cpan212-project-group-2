import mongoose from 'mongoose';
import { HttpError } from '../lib/httpError.js';
import { SAMPLE_USER_ID } from '../lib/constants.js';
import Watchlist from '../models/Watchlist.js';
import WatchlistEntry from '../models/WatchlistEntry.js';

// Finds a watchlist or throws a 404.
// A malformed id ("abc") and a well-formed id that doesn't exist both get the same 404.
async function findWatchlistOr404(id) {
  if (!mongoose.isObjectIdOrHexString(id)) {
    throw new HttpError(400, 'Watchlist not found', { id });
  }

  const watchlist = await Watchlist.findById(id);

  if (!watchlist) {
    throw new HttpError(400, 'Watchlist not found', { id });
  }

  return watchlist;
}

// GET /api/watchlists?q=&sort=&page=&limit=
// Get one page of watchlists, filtered and sorted.
// The query string was already checked by parseWatchlistListQuery (middleware/watchlistListQuery.js).
export async function getAllWatchlists(req, res) {
  const { filter, sort, page, limit } = res.locals.listQuery;

  // One page of watchlists and the total number that match, fetched at the same time.
  const [watchlists, total] = await Promise.all([
    Watchlist.find(filter)
      .sort(sort)
      .skip((page - 1) * limit)
      .limit(limit),
    Watchlist.countDocuments(filter)
  ]);

  // A page past the end isn't an error: data is just empty.
  res.status(200).json({
    data: watchlists,
    page,
    limit,
    total,
    totalPages: Math.ceil(total / limit)
  });
}

// GET /api/watchlists/:id
// Get one watchlist by ID
export async function getWatchlistById(req, res) {
  const watchlist = await findWatchlistOr404(req.params.id);

  res.status(200).json(watchlist);
}

// POST /api/watchlists
// Create a new watchlist
export async function createWatchlist(req, res) {
  // Copy only the allowed fields, so a client can't choose its own _id or userId.
  // create() runs the schema rules; a failure becomes a 400 in the error handler.
  const watchlist = await Watchlist.create({
    userId: SAMPLE_USER_ID,
    name: req.body.name,
    description: req.body.description
  });

  res.location('/api/watchlists/' + watchlist._id);
  res.status(201).json({data: watchlist});
}

// PUT /api/watchlists/:id
// Update a watchlist
export async function updateWatchlist(req, res) {
  // Copy only the fields that were sent.
  const changes = {};
  for (const field of ['name', 'description']) {
    if (req.body[field] !== undefined) {
      changes[field] = req.body[field];
    }
  }

  await findWatchlistOr404(req.params.id);

  // returnDocument: 'after' returns the updated document instead of the old one.
  // runValidators: true applies the schema rules, which updates skip by default.
  const watchlist = await Watchlist.findByIdAndUpdate(req.params.id, changes, {
    returnDocument: 'after',
    runValidators: true
  });

  res.status(200).json(watchlist);
}

// DELETE /api/watchlists/:id
// Delete a watchlist and the entries inside it
export async function deleteWatchlist(req, res) {
  const watchlist = await findWatchlistOr404(req.params.id);

  // Remove the watchlist's entries first, so none are left pointing at a missing watchlist.
  await WatchlistEntry.deleteMany({ watchlistId: watchlist._id });
  await watchlist.deleteOne();

  res.status(204).end();
}
