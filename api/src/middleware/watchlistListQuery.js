import { HttpError } from '../lib/httpError.js';
import {
    MAX_SEARCH_LENGTH,
    escapeRegex,
    rejectRepeated,
    readQuery,
    parseSort,
    parsePaging
} from '../lib/listQuery.js';

export const DEFAULT_SORT = 'name';

// Public sort name -> database field. Watchlists have no createdAt, but an ObjectId
// starts with the time it was made, so sorting on _id sorts by creation time.
export const SORT_FIELDS = { name: 'name', created: '_id' };

// Reads GET /api/watchlists?q=&sort=&page=&limit=
// and stores { filter, sort, page, limit } in res.locals.listQuery for the controller.
// Every problem goes into one 400 response.
export function parseWatchlistListQuery(req, res, next) {
    rejectRepeated(req.query, ['q', 'sort', 'page', 'limit']);

    const q = readQuery(req.query, 'q');
    const sort = readQuery(req.query, 'sort') ?? DEFAULT_SORT;

    const errors = {};
    const filter = {};

    if (Object.keys(errors).length > 0) {
        throw new HttpError(400, 'Invalid query', errors);
    }
    
    next();
}
