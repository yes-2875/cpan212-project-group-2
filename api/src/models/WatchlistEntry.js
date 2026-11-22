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
        min: 0,
        validate: {
            validator: function (value) {
                const totalEpisodes = this instanceof mongoose.Document
                    ? this.totalEpisodes
                    : this.get('totalEpisodes');

                return totalEpisodes === undefined ||
                    totalEpisodes === 0 ||
                    value <= totalEpisodes;
            },
            message: 'Current episode cannot exceed total episodes'
        }
    },
    status: {
        type: String,
        required: true,
        enum: [
            'Watching',
            'Completed',
            'Plan to Watch',
            'On Hold',
            'Dropped'
        ]
    },
    score: {
        type: Number,
        default: 0,
        min: 0,
        max: 10
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