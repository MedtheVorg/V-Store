import { NextFunction, Request, Response } from 'express';
import { CustomError } from '../utils/customError';

export function errorHandler(err: CustomError, req: Request, res: Response, next: NextFunction) {
    let message = err.message || 'Internal Server Error';
    let status = err.httpCode || 500;

    res.status(status).json({
        errMessage: message,
        status: status,
        stack: process.env.NODE_ENV === 'development' ? err.stack : null
    });
}
