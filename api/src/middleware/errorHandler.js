// Global middleware to handle all errors passed on through next(),
// including unknown endpoints and external API errors

export default function errorHandler(err, req, res, next) {
    
    const statusCode = err.status || err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    
    res.status(statusCode).json({
        error: {
            message: message,
            details: err.details || null
        }
    });
}