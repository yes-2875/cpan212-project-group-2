import { Router } from 'express';

import {
    getAllEntries,
    getEntryById,
    createEntry,
    updateEntry,
    deleteEntry
} from '../controllers/watchlistEntries.controller.js';

const router = Router();

// GET /api/watchlist-entries
router.get('/', getAllEntries);

// GET /api/watchlist-entries/:id
router.get('/:id', getEntryById);

// POST /api/watchlist-entries
router.post('/', createEntry);

// PUT /api/watchlist-entries/:id
router.put('/:id', updateEntry);

// DELETE /api/watchlist-entries/:id
router.delete('/:id', deleteEntry);

export default router;