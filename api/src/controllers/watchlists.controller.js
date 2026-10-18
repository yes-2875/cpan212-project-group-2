import { randomUUID } from 'node:crypto';
import { sampleUserId, watchlists } from '../data/store.js';

// GET /api/watchlists
// Get all watchlists
export function getAllWatchlists(req, res) {
  res.status(200).json(watchlists);
}

// GET /api/watchlists/:id
// Get one watchlist by ID
export function getWatchlistById(req, res) {
  const watchlist = watchlists.find(
    (item) => item._id === req.params.id
  );

  if (!watchlist) {
    return res.status(404).json({
      error: { message: 'Watchlist not found' }
    });
  }

  res.status(200).json(watchlist);
}

// POST /api/watchlists
// Create a new watchlist
export function createWatchlist(req, res) {
  const newWatchlist = {
    _id: randomUUID(),
    userId: sampleUserId,
    name: req.body.name,
    description: req.body.description || ''
  };

  watchlists.push(newWatchlist);

  res.status(201).json(newWatchlist);
}

// PUT /api/watchlists/:id
// Update a watchlist
export function updateWatchlist(req, res) {
  const index = watchlists.findIndex(
    (item) => item._id === req.params.id
  );

  if (index === -1) {
    return res.status(404).json({
      error: { message: 'Watchlist not found' }
    });
  }

  watchlists[index] = {
    ...watchlists[index],
    name: req.body.name ?? watchlists[index].name,
    description: req.body.description ?? watchlists[index].description
  };

  res.status(200).json(watchlists[index]);
}

// DELETE /api/watchlists/:id
// Delete a watchlist
export function deleteWatchlist(req, res) {
  const index = watchlists.findIndex(
    (item) => item._id === req.params.id
  );

  if (index === -1) {
    return res.status(404).json({
      error: { message: 'Watchlist not found' }
    });
  }

  watchlists.splice(index, 1);

  res.status(204).end();
}