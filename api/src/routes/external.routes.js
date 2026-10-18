import { Router } from "express";
import { searchAnime } from "../controllers/external.controller.js";

const router = Router();

router.get('/anime', searchAnime);

export default router;