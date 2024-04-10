import { NextFunction, Request, Response } from 'express';
import './jwt-strategy';
import passport from 'passport';
import { HttpCode, throwError } from '../../../utils/customError';

export function jwtAuth() {
    return function (req: Request, res: Response, next: NextFunction) {
        const accessToken = req.header('authorization');

        if (!accessToken) {
            return throwError(HttpCode.UNAUTHORIZED, 'No auth token provided');
        }
        passport.authenticate('jwtStrategy', { session: false }, function (err: any, user: any, info: any, status: any) {
            if (err) {
                // check for custom thrown errors
                return next(err);
            }

            if (info?.name === 'TokenExpiredError') {
                // check for token expired error
                return throwError(HttpCode.UNAUTHORIZED, 'jwt expired');
            }

            next();
        })(req, res, next);
    };
}
