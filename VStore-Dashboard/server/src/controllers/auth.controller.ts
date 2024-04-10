import { signJwt, verifyJwt } from '../utils/jwt';
import { NextFunction, Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { HttpCode, throwError } from '../utils/customError';
import { findUserByEmail, findUserById, findUserByIdAndUpdate } from '../services/user.service';

type User = {
    _id: string;
    username: string;
    avatar: string;
};

const signInUserHandler = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    const user = await findUserByEmail(email);

    if (!user) {
        return throwError(HttpCode.BAD_REQUEST, 'Invalid Credentials');
    }
    if (!(await user.validatePassword(password))) {
        return throwError(HttpCode.BAD_REQUEST, 'Invalid Credentials');
    }

    // token payload
    const payload = {
        _id: user._id,
        username: user.username,
        avatar: user.avatar
    };

    // Generate access token
    const accessToken = signJwt(payload, process.env.PRIVATE_KEY, '20m');

    // Generate refresh token
    const refreshToken = signJwt(payload, process.env.PRIVATE_KEY, '7d');

    try {
        // update the users refresh token
        const updatedUser = await findUserByIdAndUpdate(payload._id.toString(), { refreshToken }, '-password -email -refreshToken');

        res.status(200).json({ user: updatedUser, accessToken });
    } catch (error) {
        return throwError(HttpCode.INTERNAL_SERVER_ERROR);
    }
});

const logOutUserHandler = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    // Terminate an existing login session.
    // req.logOut({}, () => {});
    res.status(200).json({ message: 'User logged out.' });
});

const refreshTokenHandler = asyncHandler(async (req: Request<{}, {}, {}, { userId: string }>, res: Response, next: NextFunction) => {
    const query = req.query;
    console.log('🚀 ~ refreshTokenHandler ~ query:', query);

    const user = await findUserById(query.userId);
    console.log('🚀 ~ refreshTokenHandler ~ user:', user);

    if (!user) {
        return throwError(HttpCode.FORBIDDEN, 'failed to generate access token');
    }

    // validate refresh token
    if (!verifyJwt(user.refreshToken!, process.env.PUBLIC_KEY)) {
        return throwError(HttpCode.FORBIDDEN, 'failed to generate access token');
    }

    const payload = {
        _id: user._id,
        username: user.username,
        avatar: user.avatar
    };
    const accessToken = signJwt(payload, process.env.PRIVATE_KEY, '30m');

    res.status(200).json({ accessToken });
});

export const authControllers = {
    signInUserHandler,
    logOutUserHandler,
    refreshTokenHandler
};
