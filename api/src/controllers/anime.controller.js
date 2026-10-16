import { randomUUID } from 'node:crypto';
import { animeList } from '../data/store.js';

// GET /api/anime
export function getAllAnime(req, res) {
  res.status(200).json(animeList);
}

// GET /api/anime/:id
export function getAnimeById(req, res) {
  const anime = animeList.find(
    (item) => item._id === req.params.id
  );

  if (!anime) {
    return res.status(404).json({
      error: { message: 'Anime not found' }
    });
  }

  res.status(200).json(anime);
}

// POST /api/anime
export function createAnime(req, res) {
  const newAnime = {
    _id: randomUUID(),
    userId: 'sample-user',
    ...req.body
  };

  animeList.push(newAnime);

  res.status(201).json(newAnime);
}

// PUT /api/anime/:id
export function updateAnime(req, res) {
  const index = animeList.findIndex(
    (item) => item._id === req.params.id
  );

  if (index === -1) {
    return res.status(404).json({
      error: { message: 'Anime not found' }
    });
  }

  animeList[index] = {
    ...animeList[index],
    ...req.body,
    _id: animeList[index]._id,
    userId: animeList[index].userId
  };

  res.status(200).json(animeList[index]);
}

// DELETE /api/anime/:id
export function deleteAnime(req, res) {
  const index = animeList.findIndex(
    (item) => item._id === req.params.id
  );

  if (index === -1) {
    return res.status(404).json({
      error: { message: 'Anime not found' }
    });
  }

  animeList.splice(index, 1);

  res.status(204).end();
}