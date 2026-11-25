import { Router } from 'express';
import {
    getAllEntries,
    getEntryById,
    createEntry,
    updateEntry,
    deleteEntry
} from '../controllers/watchlistEntries.controller.js';

import { parseEntryListQuery } from '../middleware/entryListQuery.js';

const router = Router();

// Filter, sort and paginate: ?status=&watchlistId=&q=&sort=&page=&limit=
router.get('/', parseEntryListQuery, getAllEntries);
router.get('/:id', getEntryById);

// Body validation happens in the Mongoose schema (models/), not in a middleware.
router.post('/', createEntry);
router.put('/:id', updateEntry);

router.delete('/:id', deleteEntry);

export default router;