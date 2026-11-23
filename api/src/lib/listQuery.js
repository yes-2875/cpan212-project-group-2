import { HttpError } from './httpError.js';

// Shared by the list query middlewares (entryListQuery.js).

export const DEFAULT_LIMIT = 10;
export const MAX_LIMIT = 50;
export const MAX_SEARCH_LENGTH = 100;

// Escape every regex special character, so a search for "c++" or ".*" matches literally
// instead of crashing the query or matching everything (and can't be used for ReDoS).
export function escapeRegex(text) {
    return text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// "3" is a whole number. "3.5", "-1", "abc", "" and "1e3" are not.
export function parseWholeNumber(text, { min, max }) {
    const number = /^\d+$/.test(text) ? Number(text) : Number.NaN;
    return number >= min && number <= max ? number : null;
}

// Express turns ?page=1&page=2 into an array. None of our query fields make sense twice.
// Throws one 400 listing every repeated field.
export function rejectRepeated(query, names) {
    const repeated = names.filter(
        (name) => query[name] !== undefined && typeof query[name] !== 'string'
    );
    if (repeated.length > 0) {
        const details = Object.fromEntries(repeated.map((name) => [name, `Send ${name} only once`]));
        throw new HttpError(400, 'Invalid query', details);
    }
}

// A GET form sends every field, filled in or not (?q=&sort=), so an empty value means "not set".
export function readQuery(query, name) {
    return query[name] === '' ? undefined : query[name];
}

// "name" sorts A-Z, "-name" sorts Z-A. sortFields maps each allowed public name
// to the database field, e.g. { name: 'name', created: '_id' }.
// _id breaks ties, so items with the same value keep the same order on every page.
// Adds a message to errors and returns null if the field isn't allowed.
export function parseSort(sort, sortFields, errors) {
    const descending = sort.startsWith('-');
    const publicName = descending ? sort.slice(1) : sort;

    if (!Object.hasOwn(sortFields, publicName)) {
        const example = Object.keys(sortFields)[0];
        errors.sort = `Must be one of: ${Object.keys(sortFields).join(', ')}. Put - in front to reverse the order, for example -${example}`;
        return null;
    }

    const direction = descending ? -1 : 1;
    const field = sortFields[publicName];
    return field === '_id' ? { _id: direction } : { [field]: direction, _id: direction };
}

// Checks page (1 or more) and limit (1 to MAX_LIMIT). Adds messages to errors on failure.
export function parsePaging(page, limit, errors) {
    const pageNumber = parseWholeNumber(page ?? '1', { min: 1, max: Number.MAX_SAFE_INTEGER });
    if (pageNumber === null) {
        errors.page = 'Must be a whole number, 1 or more';
    }

    const limitNumber = parseWholeNumber(limit ?? String(DEFAULT_LIMIT), { min: 1, max: MAX_LIMIT });
    if (limitNumber === null) {
        errors.limit = `Must be a whole number from 1 to ${MAX_LIMIT}`;
    }

    return { page: pageNumber, limit: limitNumber };
}
