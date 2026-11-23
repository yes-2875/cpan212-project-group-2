import mongoose from 'mongoose';
import { HttpError } from '../lib/httpError.js';
import { ANIME_STATUSES } from '../schemas/validation.schemas.js';

export const DEFAULT_LIMIT = 10;
export const MAX_LIMIT = 50;
export const MAX_SEARCH_LENGTH = 100;
export const DEFAULT_SORT = 'title';

// Only these fields can be sorted on. Passing req.query.sort straight to .sort()
// would let a client sort on any field, including ones we never meant to expose.
export const SORT_FIELDS = ['title', 'score', 'currentEpisode', 'totalEpisodes'];

// Escape every regex special character, so a search for "c++" or ".*" matches literally
// instead of crashing the query or matching everything (and can't be used for ReDoS).
function escapeRegex(text) {
    return text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// "3" is a whole number. "3.5", "-1", "abc", "" and "1e3" are not.
function parseWholeNumber(text, { min, max }) {
    const number = /^\d+$/.test(text) ? Number(text) : Number.NaN;
    return number >= min && number <= max ? number : null;
}

// Reads GET /api/watchlist-entries?status=&watchlistId=&q=&sort=&page=&limit=
// and stores { filter, sort, page, limit } in res.locals.listQuery for the controller.
// Every problem goes into one 400 response.
export function parseEntryListQuery(req, res, next) {
    const names = ['status', 'watchlistId', 'q', 'sort', 'page', 'limit'];

    // Express turns ?page=1&page=2 into an array. None of these make sense twice.
    const repeated = names.filter(
        (name) => req.query[name] !== undefined && typeof req.query[name] !== 'string'
    );
    if (repeated.length > 0) {
        const details = Object.fromEntries(repeated.map((name) => [name, `Send ${name} only once`]));
        throw new HttpError(400, 'Invalid query', details);
    }

    // A GET form sends every field, filled in or not (?q=&status=), so an empty value means "not set".
    const value = (name) => (req.query[name] === '' ? undefined : req.query[name]);
    const status = value('status');
    const watchlistId = value('watchlistId');
    const q = value('q');
    const sort = value('sort') ?? DEFAULT_SORT;
    const page = value('page') ?? '1';
    const limit = value('limit') ?? String(DEFAULT_LIMIT);

    const errors = {};
    const filter = {};
    next();
}
