const BASE_URL = process.env.BASE_URL ?? 'http://localhost:3000';

// This file serves as a utility to fetch requests from the REST API that will be running alongside the frontend.

export const getWatchlists = async () => {
  const response = await fetch(`${BASE_URL}/api/watchlists`, {
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch watchlists: ${response.status} ${response.statusText}`);
  }

  return await response.json();
};

export const getWatchlistById = async (id) => {
  const response = await fetch(`${BASE_URL}/api/watchlists/${id}`, {
    cache: 'no-store',
  });

  if (response.status === 404) { return null; }

  if (!response.ok) {
    throw new Error(`Failed to fetch watchlist: ${response.status} ${response.statusText}`);
  }

  return await response.json();
};

export const getWatchlistEntries = async () => {
  const response = await fetch(`${BASE_URL}/api/watchlist-entries`, {
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch watchlist entries: ${response.status} ${response.statusText}`);
  }

  return await response.json();
};

export const getWatchlistEntryById = async (id) => {
  const response = await fetch(`${BASE_URL}/api/watchlist-entries/${id}`, {
    cache: 'no-store',
  });

  if (response.status === 404) { return null; }

  if (!response.ok) {
    throw new Error(`Failed to fetch watchlist entry: ${response.status} ${response.statusText}`);
  }

  return await response.json();
};

export const searchAnime = async (q) => {
  const response = await fetch(
    `${BASE_URL}/api/anime/search?q=${encodeURIComponent(q)}`,
    {
      cache: 'no-store',
    }
  );

  if (response.status === 404) { return null; }

  if (!response.ok) {
    throw new Error('Failed to search anime');
  }

  const result = await response.json();

  return result.data ?? [];
}