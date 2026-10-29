import { randomUUID } from 'node:crypto';

// Sample user shared by the sample data
export const sampleUserId = randomUUID();

// Sample watchlists
export const watchlists = [
    {
        _id: "1",
        userId: sampleUserId,
        name: 'My Favourite Anime',
        description: 'Anime I really enjoy'
    },
    {
        _id: "2",
        userId: sampleUserId,
        name: 'Anime to Watch Later',
        description: 'Anime I want to watch in the future'
    }
];

// Sample anime entries inside the watchlists
export const watchlistEntries = [
    {
        _id: "1",
        watchlistId: "1",
        malId: 1,
        title: 'Cowboy Bebop',
        imageUrl: 'https://cdn.myanimelist.net/images/anime/4/19644.jpg',
        totalEpisodes: 26,
        currentEpisode: 5,
        status: 'Watching',
        score: 9
    },
    {
        _id: "2",
        watchlistId: "1",
        malId: 1535,
        title: 'Death Note',
        imageUrl: '',
        totalEpisodes: 37,
        currentEpisode: 37,
        status: 'Completed',
        score: 10
    },
    {
        _id: "3",
        watchlistId: "2",
        malId: 21,
        title: 'One Piece',
        imageUrl: 'https://cdn.myanimelist.net/images/anime/1244/138851.jpg',
        totalEpisodes: 0,
        currentEpisode: 0,
        status: 'Plan to Watch',
        score: 0
    }
];