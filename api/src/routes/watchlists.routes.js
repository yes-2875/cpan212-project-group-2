import { Router } from 'express';
import {
    getAllWatchlists,
    getWatchlistById,
    createWatchlist,
    updateWatchlist,
    deleteWatchlist
} from '../controllers/watchlists.controller.js';

import { parseWatchlistListQuery } from '../middleware/watchlistListQuery.js';

const router = Router();

// Filter, sort and paginate: ?q=&sort=&page=&limit=
router.get('/', parseWatchlistListQuery, getAllWatchlists);
router.get('/:id', getWatchlistById);

// Body validation happens in the Mongoose schema (models/), not in a middleware.
router.post('/', createWatchlist);
router.put('/:id', updateWatchlist);

router.delete('/:id', deleteWatchlist);

export default router;