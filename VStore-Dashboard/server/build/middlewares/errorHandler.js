"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
function errorHandler(err, req, res, next) {
    let message = err.message || 'Internal Server Error';
    let status = err.httpCode || 500;
    res.status(status).json({
        errMessage: message,
        status: status,
        stack: process.env.NODE_ENV === 'development' ? err.stack : null
    });
}
exports.errorHandler = errorHandler;
