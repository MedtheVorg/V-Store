import asyncHandler from 'express-async-handler';
import { Request, Response, NextFunction } from 'express';

import { createUser, findUserByEmail, findUserById, findUserByIdAndDelete, findUserByIdAndUpdate, getUsers } from '../services/user.service';
import { CreateUserInput, UpdateUserInput, UserParams } from '../schemas';
import { throwError } from '../utils/customError';
import { HttpCode } from '../utils/customError';
import User from '../models/user.model';

const createUserHandler = asyncHandler(async (req: Request<{}, {}, CreateUserInput>, res: Response, next: NextFunction) => {
    const body = req.body;

    const duplicate = await findUserByEmail(body.email);
    if (duplicate) {
        return throwError(HttpCode.CONFLICT, 'a user already exists with the provided email');
    }
    const user = await createUser(body);
    res.status(201).send();
});

const readAllUsersHandler = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const users = await getUsers();

    res.status(200).json(users);
});

const readUserHandler = asyncHandler(async (req: Request<UserParams>, res: Response, next: NextFunction) => {
    const params = req.params;

    const user = await findUserById(params.userId, '-password -refreshToken');

    if (!user) {
        return throwError(HttpCode.NOT_FOUND, 'user not found');
    }

    res.status(200).json(user);
});

const updateUserHandler = asyncHandler(async (req: Request<UserParams, {}, UpdateUserInput>, res: Response, next: NextFunction) => {
    const body = req.body;
    const params = req.params;

    const { userId } = req.params;

    const user = await findUserById(userId);

    if (!user) {
        return throwError(HttpCode.NOT_FOUND, 'user not found');
    }

    // check if passed password matches the one stored in db
    if (body.oldPassword) {
        const isMatch = await user.validatePassword(body.oldPassword);

        if (!isMatch) {
            return throwError(HttpCode.BAD_REQUEST, 'Invalid password.');
        }
    }

    user.password = body.newPassword ? body.newPassword : user.password;
    user.avatar = body.avatar ? body.avatar : user.avatar;
    user.username = body.username ? body.username : user.username;

    const updatedUser = await user.save();
    // const updatedUser = await findUserByIdAndUpdate(params.userId, { avatar: body.avatar, password: body.newPassword, username: body.username });

    res.status(200).json(updatedUser);
});
const deleteUserHandler = asyncHandler(async (req: Request<UserParams>, res: Response, next: NextFunction) => {
    const params = req.params;

    const user = await findUserByIdAndDelete(params.userId);

    if (!user) {
        return throwError(HttpCode.NOT_FOUND, 'user not found');
    }
    res.status(200).json({ message: 'user deleted.' });
});

export const userControllers = {
    createUserHandler,
    readUserHandler,
    updateUserHandler,
    deleteUserHandler,
    readAllUsersHandler
};
