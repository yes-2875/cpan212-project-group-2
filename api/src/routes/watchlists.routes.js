import { Router } from 'express';
import {
    getAllWatchlists,
    getWatchlistById,
    createWatchlist,
    updateWatchlist,
    deleteWatchlist
} from '../controllers/watchlists.controller.js';

import { validate } from '../middleware/validate.js';
import {
    validateWatchlistCreate,
    validateWatchlistUpdate
} from '../schemas/validation.schemas.js';

const router = Router();

router.get('/', getAllWatchlists);
router.get('/:id', getWatchlistById);

router.post('/', validate(validateWatchlistCreate), createWatchlist);
router.put('/:id', validate(validateWatchlistUpdate), updateWatchlist);

router.delete('/:id', deleteWatchlist);

export default router;