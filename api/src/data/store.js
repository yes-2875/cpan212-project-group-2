import { randomUUID } from 'node:crypto';

// A sample user shared by our anime and reviews
export const sampleUserId = randomUUID();

// Sample anime list items
export const animeList = [
    {
        _id: randomUUID(),
        userId: sampleUserId,
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
        userId: sampleUserId,
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
        userId: sampleUserId,
        malId: 21,
        title: 'One Piece',
        imageUrl: '',
        totalEpisodes: 0,
        currentEpisode: 0,
        status: 'Plan to Watch',
        score: 0
    }
];

// Sample reviews linked to anime above
export const reviews = [
    {
        _id: randomUUID(),
        userId: sampleUserId,
        animeListItemId: animeList[0]._id,
        rating: 9,
        comment: 'A great story with memorable characters.'
    },
    {
        _id: randomUUID(),
        userId: sampleUserId,
        animeListItemId: animeList[1]._id,
        rating: 10,
        comment: 'An excellent thriller with many twists.'
    },
    {
        _id: randomUUID(),
        userId: sampleUserId,
        animeListItemId: animeList[2]._id,
        rating: 8,
        comment: 'A fun adventure with lots of potential.'
    }
];