import express from 'express';
import watchlistsRouter from './routes/watchlists.routes.js';
import watchlistEntriesRouter from './routes/watchlistEntries.routes.js';

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());

// Watchlist routes
app.use('/api/watchlists', watchlistsRouter);

// Watchlist entry routes
app.use('/api/watchlist-entries', watchlistEntriesRouter);

// Handle unknown endpoints
app.use((req, res) => {
  res.status(404).json({
    error: {
      message: 'Endpoint not found'
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});