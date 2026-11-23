import mongoose from 'mongoose';
import { HttpError } from '../lib/httpError.js';
import { ANIME_STATUSES } from '../schemas/validation.schemas.js';
import {
  MAX_SEARCH_LENGTH,
  escapeRegex,
  rejectRepeated,
  readQuery,
  parseSort,
  parsePaging
} from '../lib/listQuery.js';

export const DEFAULT_SORT = 'title';

// Only these fields can be sorted on. Passing req.query.sort straight to .sort()
// would let a client sort on any field, including ones we never meant to expose.
export const SORT_FIELDS = {
  title: 'title',
  score: 'score',
  currentEpisode: 'currentEpisode',
  totalEpisodes: 'totalEpisodes'
};

// Reads GET /api/watchlist-entries?status=&watchlistId=&q=&sort=&page=&limit=
// and stores { filter, sort, page, limit } in res.locals.listQuery for the controller.
// Every problem goes into one 400 response.
export function parseEntryListQuery(req, res, next) {
  rejectRepeated(req.query, ['status', 'watchlistId', 'q', 'sort', 'page', 'limit']);

  const status = readQuery(req.query, 'status');
  const watchlistId = readQuery(req.query, 'watchlistId');
  const q = readQuery(req.query, 'q');
  const sort = readQuery(req.query, 'sort') ?? DEFAULT_SORT;

  const errors = {};
  const filter = {};

  if (status !== undefined) {
    if (ANIME_STATUSES.includes(status)) {
      filter.status = status;
    } else {
      errors.status = `Must be one of: ${ANIME_STATUSES.join(', ')}`;
    }
  }

  if (watchlistId !== undefined) {
    if (mongoose.isObjectIdOrHexString(watchlistId)) {
      filter.watchlistId = watchlistId;
    } else {
      errors.watchlistId = 'Must be a valid watchlist id';
    }
  }

  if (q !== undefined) {
    if (q.length > MAX_SEARCH_LENGTH) {
      errors.q = `Must be ${MAX_SEARCH_LENGTH} characters or fewer`;
    } else {
      // Case-insensitive "title contains q". A RegExp object passes sanitizeFilter; { $regex } would not.
      filter.title = new RegExp(escapeRegex(q), 'i');
    }
  }

  // "-score" means score, highest first.
  const sortBy = parseSort(sort, SORT_FIELDS, errors);
  const { page, limit } = parsePaging(readQuery(req.query, 'page'), readQuery(req.query, 'limit'), errors);

  if (Object.keys(errors).length > 0) {
    throw new HttpError(400, 'Invalid query', errors);
  }

  res.locals.listQuery = { filter, sort: sortBy, page, limit };
  next();
}
