import { Router } from "express";
import { searchAnime } from "../controllers/external.controller.js";

const router = Router();

router.get('/search', searchAnime);

export default router;