const animeStatuses = [
    'Watching',
    'Completed',
    'Plan to Watch',
    'On Hold',
    'Dropped'
];

// Validate when creating a watchlist
export function validateWatchlistCreate(data) {
    const errors = {};

    if (typeof data.name !== 'string' || data.name.trim() === '') {
        errors.name = 'Name is required and must be a non-empty string';
    }

    if (
        data.description !== undefined &&
        typeof data.description !== 'string'
    ) {
        errors.description = 'Description must be a string';
    }

    return errors;
}

// Validate when updating a watchlist
export function validateWatchlistUpdate(data) {
    const errors = {};
    const allowedFields = ['name', 'description'];
    const hasAllowedField = allowedFields.some(
        (field) => data[field] !== undefined
    );

    if (!hasAllowedField) {
        errors.body = 'Provide at least one field to update';
    }

    if (
        data.name !== undefined &&
        (typeof data.name !== 'string' || data.name.trim() === '')
    ) {
        errors.name = 'Name must be a non-empty string';
    }

    if (
        data.description !== undefined &&
        typeof data.description !== 'string'
    ) {
        errors.description = 'Description must be a string';
    }

    return errors;
}

// Validate when creating a watchlist entry
export function validateEntryCreate(data) {
    const errors = {};

    if (
        typeof data.watchlistId !== 'string' ||
        data.watchlistId.trim() === ''
    ) {
        errors.watchlistId = 'Watchlist ID is required';
    }

    if (
        !Number.isInteger(data.malId) ||
        data.malId <= 0
    ) {
        errors.malId = 'malId must be a positive integer';
    }

    if (typeof data.title !== 'string' || data.title.trim() === '') {
        errors.title = 'Title is required';
    }

    if (
        data.imageUrl !== undefined &&
        typeof data.imageUrl !== 'string'
    ) {
        errors.imageUrl = 'imageUrl must be a string';
    }

    if (
        data.totalEpisodes !== undefined &&
        (!Number.isInteger(data.totalEpisodes) || data.totalEpisodes < 0)
    ) {
        errors.totalEpisodes = 'totalEpisodes must be a non-negative integer';
    }

    if (
        data.currentEpisode !== undefined &&
        (!Number.isInteger(data.currentEpisode) || data.currentEpisode < 0)
    ) {
        errors.currentEpisode = 'currentEpisode must be a non-negative integer';
    }

    if (
        data.totalEpisodes !== undefined &&
        data.currentEpisode !== undefined &&
        Number.isInteger(data.totalEpisodes) &&
        Number.isInteger(data.currentEpisode) &&
        data.totalEpisodes > 0 &&
        data.currentEpisode > data.totalEpisodes
    ) {
        errors.currentEpisode = 'currentEpisode cannot exceed totalEpisodes';
    }

    if (
        data.status !== undefined &&
        !animeStatuses.includes(data.status)
    ) {
        errors.status = 'Invalid anime status';
    }

    if (
        data.score !== undefined &&
        (typeof data.score !== 'number' || data.score < 0 || data.score > 10)
    ) {
        errors.score = 'score must be between 0 and 10';
    }

    return errors;
}

// Validate when updating a watchlist entry
export function validateEntryUpdate(data) {
    const errors = {};
    const allowedFields = [
        'watchlistId',
        'malId',
        'title',
        'imageUrl',
        'totalEpisodes',
        'currentEpisode',
        'status',
        'score'
    ];

    const hasAllowedField = allowedFields.some(
        (field) => data[field] !== undefined
    );

    if (!hasAllowedField) {
        errors.body = 'Provide at least one field to update';
    }

    if (
        data.watchlistId !== undefined &&
        (typeof data.watchlistId !== 'string' || data.watchlistId.trim() === '')
    ) {
        errors.watchlistId = 'Watchlist ID must be a non-empty string';
    }

    if (
        data.malId !== undefined &&
        (!Number.isInteger(data.malId) || data.malId <= 0)
    ) {
        errors.malId = 'malId must be a positive integer';
    }

    if (
        data.title !== undefined &&
        (typeof data.title !== 'string' || data.title.trim() === '')
    ) {
        errors.title = 'Title must be a non-empty string';
    }

    if (
        data.imageUrl !== undefined &&
        typeof data.imageUrl !== 'string'
    ) {
        errors.imageUrl = 'imageUrl must be a string';
    }

    if (
        data.totalEpisodes !== undefined &&
        (!Number.isInteger(data.totalEpisodes) || data.totalEpisodes < 0)
    ) {
        errors.totalEpisodes = 'totalEpisodes must be a non-negative integer';
    }

    if (
        data.currentEpisode !== undefined &&
        (!Number.isInteger(data.currentEpisode) || data.currentEpisode < 0)
    ) {
        errors.currentEpisode = 'currentEpisode must be a non-negative integer';
    }

    if (
        data.totalEpisodes !== undefined &&
        data.currentEpisode !== undefined &&
        Number.isInteger(data.totalEpisodes) &&
        Number.isInteger(data.currentEpisode) &&
        data.totalEpisodes > 0 &&
        data.currentEpisode > data.totalEpisodes
    ) {
        errors.currentEpisode = 'currentEpisode cannot exceed totalEpisodes';
    }

    if (
        data.status !== undefined &&
        !animeStatuses.includes(data.status)
    ) {
        errors.status = 'Invalid anime status';
    }

    if (
        data.score !== undefined &&
        (typeof data.score !== 'number' || data.score < 0 || data.score > 10)
    ) {
        errors.score = 'score must be between 0 and 10';
    }

    return errors;
}