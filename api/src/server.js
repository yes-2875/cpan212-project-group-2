import express from 'express';

import animeRouter from './routes/anime.routes.js';
import reviewsRouter from './routes/reviews.routes.js';

const app = express();
const PORT = process.env.PORT || 4000;

// Allow the server to read JSON request bodies
app.use(express.json());

// Connect the anime and review routes
app.use('/api/anime', animeRouter);
app.use('/api/reviews', reviewsRouter);

// Handle unknown endpoints
app.use((req, res) => {
  res.status(404).json({
    error: {
      message: 'Endpoint not found'
    }
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});