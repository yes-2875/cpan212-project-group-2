const animeStatuses = [
    'Watching',
    'Completed',
    'Plan to Watch',
    'On Hold',
    'Dropped'
];

// Check the data for an anime
export function validateAnime(data) {
    const errors = {};

    if (typeof data.malId !== 'number' || data.malId <= 0) {
        errors.malId = 'malId must be a positive number';
    }

    if (typeof data.title !== 'string' || data.title.trim() === '') {
        errors.title = 'Title is required';
    }

    if (typeof data.imageUrl !== 'string') {
        errors.imageUrl = 'imageUrl must be a string';
    }

    if (!Number.isInteger(data.totalEpisodes) || data.totalEpisodes < 0) {
        errors.totalEpisodes = 'totalEpisodes must be a non-negative integer';
    }

    if (!Number.isInteger(data.currentEpisode) || data.currentEpisode < 0) {
        errors.currentEpisode = 'currentEpisode must be a non-negative integer';
    } else if (
        Number.isInteger(data.totalEpisodes) &&
        data.totalEpisodes > 0 &&
        data.currentEpisode > data.totalEpisodes
    ) {
        errors.currentEpisode = 'currentEpisode cannot exceed totalEpisodes';
    }

    if (!animeStatuses.includes(data.status)) {
        errors.status = 'Invalid anime status';
    }

    if (
        typeof data.score !== 'number' ||
        data.score < 0 ||
        data.score > 10
    ) {
        errors.score = 'score must be between 0 and 10';
    }

    return errors;
}

// Check the data for a review
export function validateReview(data) {
    const errors = {};

    if (
        typeof data.animeListItemId !== 'string' ||
        data.animeListItemId.trim() === ''
    ) {
        errors.animeListItemId = 'Anime ID is required';
    }

    if (
        typeof data.rating !== 'number' ||
        data.rating < 0 ||
        data.rating > 10
    ) {
        errors.rating = 'rating must be between 0 and 10';
    }

    if (typeof data.comment !== 'string' || data.comment.trim() === '') {
        errors.comment = 'Comment is required';
    }

    return errors;
}