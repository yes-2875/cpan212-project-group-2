// npm run seed
// Deletes every watchlist and watchlist entry, then inserts the sample data below.
// No API route creates or deletes seed data; only this script does.
import mongoose from 'mongoose';
import connectDB from '../src/db/connect.js';
import Watchlist from '../src/models/Watchlist.js';
import WatchlistEntry from '../src/models/WatchlistEntry.js';
import { SAMPLE_USER_ID } from '../src/lib/constants.js';

const CDN = 'https://cdn.myanimelist.net/images/anime/';

const sampleWatchlists = [
    { key: 'favourites', name: 'My Favourite Anime', description: 'Anime I really enjoy' },
    { key: 'later', name: 'Anime to Watch Later', description: 'Anime I want to watch in the future' },
    { key: 'current', name: 'Currently Watching', description: 'Shows I am in the middle of' },
    { key: 'classics', name: 'Classics', description: 'Older series worth revisiting' }
];

// list = which watchlist above the entry goes in (by key). Pagination should have several pages.
const sampleEntries = [
    // My Favourite Anime
    { list: 'favourites', malId: 1, title: 'Cowboy Bebop', imageUrl: CDN + '4/19644.jpg', totalEpisodes: 26, currentEpisode: 26, status: 'Completed', score: 9 },
    { list: 'favourites', malId: 1535, title: 'Death Note', imageUrl: CDN + '1079/138100.jpg', totalEpisodes: 37, currentEpisode: 37, status: 'Completed', score: 10 },
    { list: 'favourites', malId: 5114, title: 'Fullmetal Alchemist: Brotherhood', imageUrl: CDN + '1208/94745.jpg', totalEpisodes: 64, currentEpisode: 64, status: 'Completed', score: 10 },
    { list: 'favourites', malId: 9253, title: 'Steins;Gate', imageUrl: CDN + '1935/127974.jpg', totalEpisodes: 24, currentEpisode: 24, status: 'Completed', score: 9 },
    { list: 'favourites', malId: 11061, title: 'Hunter x Hunter (2011)', imageUrl: CDN + '1337/99013.jpg', totalEpisodes: 148, currentEpisode: 148, status: 'Completed', score: 10 },
    { list: 'favourites', malId: 1575, title: 'Code Geass: Lelouch of the Rebellion', imageUrl: CDN + '5/50331.jpg', totalEpisodes: 25, currentEpisode: 25, status: 'Completed', score: 9 },
    { list: 'favourites', malId: 32281, title: 'Your Name.', imageUrl: CDN + '5/87048.jpg', totalEpisodes: 1, currentEpisode: 1, status: 'Completed', score: 9 },
    { list: 'favourites', malId: 33352, title: 'Violet Evergarden', imageUrl: CDN + '1795/95088.jpg', totalEpisodes: 13, currentEpisode: 13, status: 'Completed', score: 8 },
    { list: 'favourites', malId: 28851, title: 'A Silent Voice', imageUrl: CDN + '1122/96435.jpg', totalEpisodes: 1, currentEpisode: 1, status: 'Completed', score: 9 },

    // Anime to Watch Later
    { list: 'later', malId: 21, title: 'One Piece', imageUrl: CDN + '1244/138851.jpg', totalEpisodes: 0, currentEpisode: 0, status: 'Plan to Watch', score: 0 },
    { list: 'later', malId: 37521, title: 'Vinland Saga', imageUrl: CDN + '1500/103005.jpg', totalEpisodes: 24, currentEpisode: 0, status: 'Plan to Watch', score: 0 },
    { list: 'later', malId: 52991, title: 'Frieren: Beyond Journey\'s End', imageUrl: CDN + '1015/138006.jpg', totalEpisodes: 28, currentEpisode: 0, status: 'Plan to Watch', score: 0 },
    { list: 'later', malId: 918, title: 'Gintama', imageUrl: CDN + '10/73274.jpg', totalEpisodes: 201, currentEpisode: 0, status: 'Plan to Watch', score: 0 },
    { list: 'later', malId: 31043, title: 'Erased', imageUrl: CDN + '10/77957.jpg', totalEpisodes: 12, currentEpisode: 0, status: 'Plan to Watch', score: 0 },
    { list: 'later', malId: 4224, title: 'Toradora!', imageUrl: CDN + '13/22128.jpg', totalEpisodes: 25, currentEpisode: 0, status: 'Plan to Watch', score: 0 },
    { list: 'later', malId: 44511, title: 'Chainsaw Man', imageUrl: CDN + '1806/126216.jpg', totalEpisodes: 12, currentEpisode: 0, status: 'Plan to Watch', score: 0 },
    { list: 'later', malId: 22319, title: 'Tokyo Ghoul', imageUrl: CDN + '5/64449.jpg', totalEpisodes: 12, currentEpisode: 3, status: 'Dropped', score: 5 },

    // Currently Watching
    { list: 'current', malId: 16498, title: 'Attack on Titan', imageUrl: CDN + '10/47347.jpg', totalEpisodes: 25, currentEpisode: 18, status: 'Watching', score: 9 },
    { list: 'current', malId: 38000, title: 'Demon Slayer: Kimetsu no Yaiba', imageUrl: CDN + '1286/99889.jpg', totalEpisodes: 26, currentEpisode: 12, status: 'Watching', score: 8 },
    { list: 'current', malId: 40748, title: 'Jujutsu Kaisen', imageUrl: CDN + '1171/109222.jpg', totalEpisodes: 24, currentEpisode: 10, status: 'Watching', score: 8 },
    { list: 'current', malId: 50265, title: 'Spy x Family', imageUrl: CDN + '1441/122795.jpg', totalEpisodes: 12, currentEpisode: 7, status: 'Watching', score: 8 },
    { list: 'current', malId: 32182, title: 'Mob Psycho 100', imageUrl: CDN + '8/80356.jpg', totalEpisodes: 12, currentEpisode: 5, status: 'Watching', score: 8 },
    { list: 'current', malId: 31964, title: 'My Hero Academia', imageUrl: CDN + '10/78745.jpg', totalEpisodes: 13, currentEpisode: 6, status: 'On Hold', score: 7 },
    { list: 'current', malId: 20583, title: 'Haikyu!!', imageUrl: CDN + '7/76014.jpg', totalEpisodes: 25, currentEpisode: 14, status: 'Watching', score: 9 },
    { list: 'current', malId: 30276, title: 'One Punch Man', imageUrl: CDN + '12/76049.jpg', totalEpisodes: 12, currentEpisode: 9, status: 'Watching', score: 8 },

    // Classics
    { list: 'classics', malId: 20, title: 'Naruto', imageUrl: CDN + '13/17405.jpg', totalEpisodes: 220, currentEpisode: 220, status: 'Completed', score: 8 },
    { list: 'classics', malId: 269, title: 'Bleach', imageUrl: CDN + '3/40451.jpg', totalEpisodes: 366, currentEpisode: 120, status: 'On Hold', score: 7 },
    { list: 'classics', malId: 30, title: 'Neon Genesis Evangelion', imageUrl: CDN + '1314/108941.jpg', totalEpisodes: 26, currentEpisode: 26, status: 'Completed', score: 8 },
    { list: 'classics', malId: 199, title: 'Spirited Away', imageUrl: CDN + '6/179.jpg', totalEpisodes: 1, currentEpisode: 1, status: 'Completed', score: 10 },
    { list: 'classics', malId: 205, title: 'Samurai Champloo', imageUrl: CDN + '1375/121599.jpg', totalEpisodes: 26, currentEpisode: 8, status: 'Dropped', score: 6 },
    { list: 'classics', malId: 11757, title: 'Sword Art Online', imageUrl: CDN + '11/39717.jpg', totalEpisodes: 25, currentEpisode: 25, status: 'Completed', score: 6 }
];

async function seed() {
    await connectDB();

    // Start from empty collections, so running the script twice doesn't duplicate anything.
    // Entries go first because they point at watchlists.
    const deletedEntries = await WatchlistEntry.deleteMany({});
    const deletedWatchlists = await Watchlist.deleteMany({});

    // insertMany() checks the schema rules, so a typo in the data above fails loudly.
    const watchlists = await Watchlist.insertMany(
        sampleWatchlists.map(({ name, description }) => ({ userId: SAMPLE_USER_ID, name, description }))
    );

    // Look up each new watchlist's _id by its key, to fill in each entry's watchlistId reference.
    const idByKey = Object.fromEntries(sampleWatchlists.map((list, i) => [list.key, watchlists[i]._id]));
    const entries = await WatchlistEntry.insertMany(
        sampleEntries.map(({ list, ...entry }) => ({ ...entry, watchlistId: idByKey[list] }))
    );

    console.log(`Removed ${deletedWatchlists.deletedCount} watchlists and ${deletedEntries.deletedCount} entries`);
    console.log(`Inserted ${watchlists.length} watchlists and ${entries.length} entries`);
}

try {
    await seed();
} catch (error) {
    console.error('Seed failed: ' + error.message);
    process.exitCode = 1;
} finally {
    // Close the connection, or the script never ends.
    await mongoose.disconnect();
}
