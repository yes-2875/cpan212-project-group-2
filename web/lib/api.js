
const BASE_URL = process.env.BASE_URL ?? 'http://localhost:3000';

// This file serves as a utility to fetch requests from the REST API that will be running alongside the frontend.

// Builds ?a=1&b=2 from an object, leaving out empty values. The API treats an empty value
// as "not set" anyway, but leaving them out keeps the request URL clean.
function makeQueryString(params = {}) {
  const query = new URLSearchParams();

  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== null && value !== '') {
      query.set(key, String(value));
    }
  }
  const result = query.toString();
  return result ? `?${result}` : '';
}

// Reads the API's error message ({ error: { message } }) if there is one, for a clearer thrown error.
async function errorText(response, what) {
  let message = `${response.status} ${response.statusText}`;
  try {
    const body = await response.json();
    if (body?.error?.message) {
      message = `${response.status} ${body.error.message}`;
    }
  } catch {
    // The body wasn't JSON; the status line is enough.
  }
  return `Failed to ${what}: ${message}`;
}

// Returns the API's whole list response: { data, page, limit, total, totalPages }.
// Each watchlist in data also has entryCount.
export const getWatchlists = async (params = {}) => {
  const response = await fetch(`${BASE_URL}/api/watchlists${makeQueryString(params)}`, {
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error(await errorText(response, 'fetch watchlists'));
  }

  return await response.json();
};

// Returns the watchlist, or null if it doesn't exist (404).
export const getWatchlistById = async (id) => {
  const response = await fetch(`${BASE_URL}/api/watchlists/${encodeURIComponent(id)}`, {
    cache: 'no-store',
  });

  if (response.status === 404) { return null; }

  if (!response.ok) {
    throw new Error(await errorText(response, 'fetch watchlist'));
  }

  return await response.json();
};

// Returns the API's whole list response: { data, page, limit, total, totalPages }.
// Params: watchlistId, status, q, sort, page, limit.
export const getWatchlistEntries = async (params = {}) => {
  const response = await fetch(`${BASE_URL}/api/watchlist-entries${makeQueryString(params)}`, {
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error(await errorText(response, 'fetch watchlist entries'));
  }

  return await response.json();
};

// Returns the entry (with watchlistId populated as the whole watchlist), or null if it doesn't exist (404).
export const getWatchlistEntryById = async (id) => {
  const response = await fetch(`${BASE_URL}/api/watchlist-entries/${encodeURIComponent(id)}`, {
    cache: 'no-store',
  });

  if (response.status === 404) { return null; }

  if (!response.ok) {
    throw new Error(await errorText(response, 'fetch watchlist entry'));
  }

  return await response.json();
};

// Returns an array of search results, or null if the search failed with a 404.
export const searchAnime = async (q) => {
  const response = await fetch(`${BASE_URL}/api/anime/search${makeQueryString({ q })}`, {
    cache: 'no-store',
  });

  if (response.status === 404) { return null; }

  if (!response.ok) {
    throw new Error(await errorText(response, 'search anime'));
  }

  const result = await response.json();

  return result.data ?? [];
};

// The id of an entry's watchlist. The API populates watchlistId, so it's usually the whole
// watchlist object, but it can also be a plain id string (e.g. in a new entry from the search page).
export function watchlistIdOf(entry) {
  return entry?.watchlistId?._id ?? entry?.watchlistId;
}
