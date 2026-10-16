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