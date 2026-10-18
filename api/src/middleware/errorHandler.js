export function errorHandler(err, req, res, next) {
    const statusCode = err.status || err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    
    
}