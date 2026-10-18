import { Router } from 'express';

import {
    getAllWatchlists,
    getWatchlistById,
    createWatchlist,
    updateWatchlist,
    deleteWatchlist
} from '../controllers/watchlists.controller.js';

const router = Router();

// GET /api/watchlists
router.get('/', getAllWatchlists);

// GET /api/watchlists/:id
router.get('/:id', getWatchlistById);

// POST /api/watchlists
router.post('/', createWatchlist);

// PUT /api/watchlists/:id
router.put('/:id', updateWatchlist);

// DELETE /api/watchlists/:id
router.delete('/:id', deleteWatchlist);

export default router;