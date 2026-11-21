import mongoose from 'mongoose';

const watchlistEntrySchema = new mongoose.Schema({
    watchlistId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Watchlist',
        required: true
    },
    malId: {
        type: Number,
        required: true,
        min: 1
    },
    title: {
        type: String,
        required: true,
        trim: true,
        minlength: 1,
        maxlength: 200
    },
    imageUrl: {
        type: String,
        default: ''
    },
    totalEpisodes: {
        type: Number,
        default: 0,
        min: 0
    },
    currentEpisode: {
        type: Number,
        default: 0,
        min: 0
    },
    status: {
        type: String,
        required: true,
        enum: ['Plan to Watch', 'Watching', 'Completed']
    },
    score: {
        type: Number,
        default: 0,
        min: 0,
        max: 10
    }
});

const WatchlistEntry = mongoose.model(
    'WatchlistEntry',
    watchlistEntrySchema
);

export default WatchlistEntry;