import { Router } from 'express';

import {
    getAllAnime,
    getAnimeById,
    createAnime,
    updateAnime,
    deleteAnime
} from '../controllers/anime.controller.js';

const router = Router();

// GET /api/anime
router.get('/', getAllAnime);

// GET /api/anime/:id
router.get('/:id', getAnimeById);

// POST /api/anime
router.post('/', createAnime);

// PUT /api/anime/:id
router.put('/:id', updateAnime);

// DELETE /api/anime/:id
router.delete('/:id', deleteAnime);

export default router;