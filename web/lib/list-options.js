// Turns the URL's search params into safe values for the list pages, and builds their links.
// The page is forgiving, the API is strict: anything unexpected in the URL (a typo, ?page=abc,
// ?sort=a&sort=b) falls back to the default, so a hand-edited URL shows the normal list
// instead of a 400 error page. The API still rejects bad values from anyone who calls it directly.

// The same list the API's WatchlistEntry model uses.
export const STATUSES = ['Watching', 'Completed', 'Plan to Watch', 'On Hold', 'Dropped'];

// Page sizes offered in the "Items per page" menu. The API's maximum is 50.
export const PAGE_SIZES = [5, 10, 20, 50];
export const DEFAULT_LIMIT = 10;

// Must match the search limit in the API (MAX_SEARCH_LENGTH).
export const MAX_SEARCH_LENGTH = 100;

// The labels people see, and the sort value the API accepts for each one.
// The first option is the default.
export const WATCHLIST_SORT_OPTIONS = [
  { value: 'name', label: 'Name (A-Z)' },
  { value: '-name', label: 'Name (Z-A)' },
  { value: '-created', label: 'Newest first' },
  { value: 'created', label: 'Oldest first' },
];

export const ENTRY_SORT_OPTIONS = [
  { value: 'title', label: 'Title (A-Z)' },
  { value: '-title', label: 'Title (Z-A)' },
  { value: '-score', label: 'Score (highest first)' },
  { value: 'score', label: 'Score (lowest first)' },
  { value: '-currentEpisode', label: 'Current episode (highest first)' },
  { value: 'currentEpisode', label: 'Current episode (lowest first)' },
  { value: '-totalEpisodes', label: 'Total episodes (highest first)' },
  { value: 'totalEpisodes', label: 'Total episodes (lowest first)' },
];

// Each value in searchParams is a string, an array (?q=a&q=b) or undefined. Only a single string counts.
function text(value) {
  return typeof value === 'string' ? value.trim().slice(0, MAX_SEARCH_LENGTH) : '';
}

function oneOf(value, options, fallback) {
  return options.includes(value) ? value : fallback;
}

function pageNumber(value) {
  return typeof value === 'string' && /^[1-9]\d*$/.test(value) ? Number(value) : 1;
}

function limitNumber(value) {
  const number = typeof value === 'string' ? Number(value) : NaN;
  return PAGE_SIZES.includes(number) ? number : DEFAULT_LIMIT;
}

const sortValues = (options) => options.map((option) => option.value);

// /watchlists?q=&sort=&page=&limit=
export function readWatchlistListOptions(searchParams = {}) {
  return {
    q: text(searchParams.q),
    sort: oneOf(searchParams.sort, sortValues(WATCHLIST_SORT_OPTIONS), WATCHLIST_SORT_OPTIONS[0].value),
    page: pageNumber(searchParams.page),
    limit: limitNumber(searchParams.limit),
  };
}

// /watchlists/:id?status=&q=&sort=&page=&limit=
export function readEntryListOptions(searchParams = {}) {
  return {
    status: oneOf(searchParams.status, STATUSES, ''),
    q: text(searchParams.q),
    sort: oneOf(searchParams.sort, sortValues(ENTRY_SORT_OPTIONS), ENTRY_SORT_OPTIONS[0].value),
    page: pageNumber(searchParams.page),
    limit: limitNumber(searchParams.limit),
  };
}

// Builds a link such as /watchlists?q=fav&page=2. Empty values and defaults are left out,
// so the first page with no filters is just the plain path.
function listHref(path, options, defaults) {
  const params = new URLSearchParams();
  for (const [name, value] of Object.entries(options)) {
    if (value === undefined || value === null || value === '' || value === defaults[name]) {
      continue;
    }
    params.set(name, String(value));
  }
  const query = params.toString();
  return query ? `${path}?${query}` : path;
}

const WATCHLIST_DEFAULTS = { sort: WATCHLIST_SORT_OPTIONS[0].value, page: 1, limit: DEFAULT_LIMIT };
const ENTRY_DEFAULTS = { sort: ENTRY_SORT_OPTIONS[0].value, page: 1, limit: DEFAULT_LIMIT };

export function watchlistsHref(options) {
  return listHref('/watchlists', options, WATCHLIST_DEFAULTS);
}

export function watchlistHref(watchlistId, options) {
  return listHref(`/watchlists/${watchlistId}`, options, ENTRY_DEFAULTS);
}
