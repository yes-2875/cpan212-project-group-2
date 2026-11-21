import mongoose from 'mongoose';

const watchlistSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 1,
        maxlength: 100
    },
    description: {
        type: String,
        trim: true,
        maxlength: 500,
        default: ''
    }
});

const Watchlist = mongoose.model('Watchlist', watchlistSchema);

export default Watchlist;