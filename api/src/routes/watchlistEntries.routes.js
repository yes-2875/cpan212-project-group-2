import { Router } from 'express';
import {
    getAllEntries,
    getEntryById,
    createEntry,
    updateEntry,
    deleteEntry
} from '../controllers/watchlistEntries.controller.js';

import { validate } from '../middleware/validate.js';
import {
    validateEntryCreate,
    validateEntryUpdate
} from '../schemas/validation.schemas.js';

const router = Router();

router.get('/', getAllEntries);
router.get('/:id', getEntryById);

router.post('/', validate(validateEntryCreate), createEntry);
router.put('/:id', validate(validateEntryUpdate), updateEntry);

router.delete('/:id', deleteEntry);

export default router;