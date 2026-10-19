import express from 'express';
import watchlistsRouter from './routes/watchlists.routes.js';
import watchlistEntriesRouter from './routes/watchlistEntries.routes.js';
import externalRouter from './routes/external.routes.js';
import errorHandler from './middleware/errorHandler.js';

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());

// Watchlist routes
app.use('/api/watchlists', watchlistsRouter);

// Watchlist entry routes
app.use('/api/watchlist-entries', watchlistEntriesRouter);

// External API searching route
app.use('/api/anime', externalRouter);

// Handle unknown endpoints and pass onto errorHandler
app.use((req, res, next) => {
  const error = new Error(`${req.method} ${req.originalUrl}: Endpoint not found`);
  error.status = 404;
  
  next(error);
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});