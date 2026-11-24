import mongoose from 'mongoose';

// The one list of statuses. The schema's enum and the list query middleware both use it.
export const ANIME_STATUSES = [
    'Watching',
    'Completed',
    'Plan to Watch',
    'On Hold',
    'Dropped'
];

// The fields a client may send when creating or updating an entry.
export const ENTRY_FIELDS = [
    'watchlistId',
    'malId',
    'title',
    'imageUrl',
    'totalEpisodes',
    'currentEpisode',
    'status',
    'score'
];

// Mongoose has no "whole number" rule, so this validator adds one.
function wholeNumber(message) {
    return { validator: Number.isInteger, message };
}

// These rules replace the old validateEntryCreate/validateEntryUpdate functions.
// The text in each [ ] is the message the API sends back when that rule fails.
// `cast` is the message when a value can't be converted at all (e.g. malId: "abc").
// Number fields with a default are also required: Mongoose turns "" into null,
// and required is what rejects that null instead of saving it.

const watchlistEntrySchema = new mongoose.Schema({
    watchlistId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Watchlist',
        required: [true, 'Watchlist ID is required'],
        cast: 'Watchlist ID must be a valid id'
    },
    malId: {
        type: Number,
        required: [true, 'malId is required'],
        cast: 'malId must be a number',
        min: [1, 'malId must be a positive whole number'],
        validate: wholeNumber('malId must be a positive whole number')
    },
    title: {
        type: String,
        required: [true, 'Title is required'],
        cast: 'Title must be text',
        trim: true,
        minlength: [1, 'Title is required'],
        maxlength: [200, 'Title must be 200 characters or fewer']
    },
    imageUrl: {
        type: String,
        cast: 'imageUrl must be text',
        default: ''
    },
    totalEpisodes: {
        type: Number,
        required: [true, 'totalEpisodes is required'],
        cast: 'totalEpisodes must be a number',
        default: 0,
        min: [0, 'totalEpisodes must be a whole number, 0 or more'],
        validate: wholeNumber('totalEpisodes must be a whole number, 0 or more')
    },
    currentEpisode: {
        type: Number,
        required: [true, 'currentEpisode is required'],
        cast: 'currentEpisode must be a number',
        default: 0,
        min: [0, 'currentEpisode must be a whole number, 0 or more'],
        validate: [
            wholeNumber('currentEpisode must be a whole number, 0 or more'),
            {
                // totalEpisodes 0 means "unknown" (e.g. a show still airing), so any episode is allowed.
                validator: function (value) {
                    return this.totalEpisodes === 0 || value <= this.totalEpisodes;
                },
                message: 'Current episode cannot exceed total episodes'
            }
        ]
    },
    status: {
        type: String,
        required: [true, 'Status is required'],
        default: 'Plan to Watch',
        enum: {
            values: ANIME_STATUSES,
            message: `Status must be one of: ${ANIME_STATUSES.join(', ')}`
        }
    },
    score: {
        type: Number,
        required: [true, 'Score is required'],
        cast: 'Score must be a number',
        default: 0,
        min: [0, 'Score must be from 0 to 10'],
        max: [10, 'Score must be from 0 to 10']
    }
}, {
    toJSON: {
        transform: function (doc, ret) {
            delete ret.__v;
            return ret;
        },
    }
});

const WatchlistEntry = mongoose.model('WatchlistEntry', watchlistEntrySchema);

export default WatchlistEntry;