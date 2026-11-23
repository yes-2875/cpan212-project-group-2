import mongoose from 'mongoose';
import { HttpError } from "../lib/httpError.js";

// Global middleware to handle all errors thrown and return a JSON shape,
// including unknown endpoints, external API errors and bugs in the server
export default function errorHandler(err, req, res, next) {
    if (res.headersSent) {
        return next(err);
    }

    // The Mongoose schema rejected the data. err.errors has one entry per field that broke a rule,
    // so the response lists every problem at once: { error: { message, details: { field: message } } }
    if (err instanceof mongoose.Error.ValidationError) {
        const details = {};
        for (const field in err.errors) {
            details[field] = err.errors[field].message;
        }
        return res.status(400).json({ error: { message: 'Validation failed', details } });
    }

    // A value couldn't be converted to the schema's type.
    // On _id it's a badly formed id, which is the same as "doesn't exist": 404.
    // On any other field it's bad input: 400 with that field's detail.
    if (err instanceof mongoose.Error.CastError) {
        if (err.path === '_id') {
            return res.status(404).json({ error: { message: 'Resource not found', details: { id: err.value } } });
        }
        return res.status(400).json({
            error: { message: 'Validation failed', details: { [err.path]: `Invalid value for ${err.path}` } }
        });
    }

    // A unique index was broken (MongoDB duplicate key error).
    if (err.code === 11000) {
        return res.status(409).json({
            error: { message: 'Duplicate value', details: err.keyValue }
        });
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
