import mongoose from 'mongoose';

// These rules replace the old validateWatchlistCreate/validateWatchlistUpdate functions.
// The text in each [ ] is the message the API sends back when that rule fails.
const watchlistSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: [true, 'Name is required'],
        // Shown instead of Mongoose's long message when the value can't become text (an object or array).
        cast: 'Name must be text',
        trim: true,
        minlength: [1, 'Name is required'],
        maxlength: [100, 'Name must be 100 characters or fewer']
    },
    description: {
        type: String,
        cast: 'Description must be text',
        trim: true,
        maxlength: [500, 'Description must be 500 characters or fewer'],
        default: ''
    }
}, {
    toJSON: {
        transform: function (doc, ret) {
            delete ret.__v;
            return ret;
        },
    }
});

const Watchlist = mongoose.model('Watchlist', watchlistSchema);

export default Watchlist;