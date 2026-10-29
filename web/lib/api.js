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
  // TODO (Zlata): needs to be implemented
};

export const getWatchlistEntries = async () => {
  // TODO (Zlata): needs to be implemented
};

export const getWatchlistEntryById = async (id) => {
  // TODO (Zlata): needs to be implemented
};

export const searchAnime = async (q) => {
  try {
    const response = await fetch(
      `${API_ORIGIN}/api/anime/search?q=${encodeURIComponent(q)}`,
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