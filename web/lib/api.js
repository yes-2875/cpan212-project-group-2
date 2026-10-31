const API_ORIGIN = process.env.API_ORIGIN ?? 'http://localhost:4000';

// This file serves as a utility to fetch requests from the REST API that will be running alongside the frontend.

export const getWatchlists = async () => {
  try {
    const response = await fetch(`${API_ORIGIN}/api/watchlists`, {
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error('Failed to fetch watchlists');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching watchlists:', error);
    return null;
  }
};

export const getWatchlistById = async (id) => {
  try {
    const response = await fetch(`${API_ORIGIN}/api/watchlists/${id}`, {
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error('Failed to fetch watchlist');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching watchlist:', error);
    return null;
  }
};

export const getWatchlistEntries = async () => {
  try {
    const response = await fetch(`${API_ORIGIN}/api/watchlist-entries`, {
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error('Failed to fetch watchlist entries');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching watchlist entries:', error);
    return null;
  }
};

export const getWatchlistEntryById = async (id) => {
  try {
    const response = await fetch(`${API_ORIGIN}/api/watchlist-entries/${id}`, {
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error('Failed to fetch watchlist entry');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching watchlist entry:', error);
    return null;
  }
};

export const searchAnime = async (q) => {
  try {
    const response = await fetch(
      `/api/anime/search?q=${encodeURIComponent(q)}`,
      {
        cache: 'no-store',
      }
    );

    if (!response.ok) {
      throw new Error('Failed to search anime');
    }

    const result = await response.json();

    return result.data ?? [];
  } catch (error) {
    console.error('Error searching anime:', error);
    return null;
  }
}