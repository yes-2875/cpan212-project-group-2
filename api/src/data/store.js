import { randomUUID } from 'node:crypto';

// Sample user shared by the sample data
export const sampleUserId = randomUUID();

// Sample watchlists
export const watchlists = [
    {
        _id: randomUUID(),
        userId: sampleUserId,
        name: 'My Favourite Anime',
        description: 'Anime I really enjoy'
    },
    {
        _id: randomUUID(),
        userId: sampleUserId,
        name: 'Anime to Watch Later',
        description: 'Anime I want to watch in the future'
    }
];

// Sample anime entries inside the watchlists
export const watchlistEntries = [
    {
        _id: randomUUID(),
        watchlistId: watchlists[0]._id,
        malId: 1,
        title: 'Cowboy Bebop',
        imageUrl: '',
        totalEpisodes: 26,
        currentEpisode: 5,
        status: 'Watching',
        score: 9
    },
    {
        _id: randomUUID(),
        watchlistId: watchlists[0]._id,
        malId: 1535,
        title: 'Death Note',
        imageUrl: '',
        totalEpisodes: 37,
        currentEpisode: 37,
        status: 'Completed',
        score: 10
    },
    {
        _id: randomUUID(),
        watchlistId: watchlists[1]._id,
        malId: 21,
        title: 'One Piece',
        imageUrl: '',
        totalEpisodes: 0,
        currentEpisode: 0,
        status: 'Plan to Watch',
        score: 0
    }
];