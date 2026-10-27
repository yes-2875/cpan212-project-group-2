import { HttpError } from "../lib/httpError";

// Global middleware to handle all errors thrown and return a JSON shape,
// including unknown endpoints, external API errors and bugs in the server
export default function errorHandler(err, req, res, next) {
    if (res.headersSent) {
        return next(err);
    }
    
    if (err instanceof HttpError || err.status < 500) {
        return res.status(err.status).json({
            error: {
                message: err.message,
                details: err.details,
            }
        });
    }
    
    // Anything other than an HttpError or error with a status code < 500 is a bug.
    // Details go to the terminal running the server.
    console.error(err);
    res.status(500).json({ error: {message: 'Internal Server Error'} });
}