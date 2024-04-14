"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userControllers = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const user_service_1 = require("../services/user.service");
const customError_1 = require("../utils/customError");
const customError_2 = require("../utils/customError");
const createUserHandler = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const duplicate = yield (0, user_service_1.findUserByEmail)(body.email);
    if (duplicate) {
        return (0, customError_1.throwError)(customError_2.HttpCode.CONFLICT, 'a user already exists with the provided email');
    }
    const user = yield (0, user_service_1.createUser)(body);
    res.status(201).send();
}));
const readAllUsersHandler = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield (0, user_service_1.getUsers)();
    res.status(200).json(users);
}));
const readUserHandler = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const params = req.params;
    const user = yield (0, user_service_1.findUserById)(params.userId, '-password -refreshToken');
    if (!user) {
        return (0, customError_1.throwError)(customError_2.HttpCode.NOT_FOUND, 'user not found');
    }
    res.status(200).json(user);
}));
const updateUserHandler = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const params = req.params;
    const { userId } = req.params;
    const user = yield (0, user_service_1.findUserById)(userId);
    if (!user) {
        return (0, customError_1.throwError)(customError_2.HttpCode.NOT_FOUND, 'user not found');
    }
    // check if passed password matches the one stored in db
    if (body.oldPassword) {
        const isMatch = yield user.validatePassword(body.oldPassword);
        if (!isMatch) {
            return (0, customError_1.throwError)(customError_2.HttpCode.BAD_REQUEST, 'Invalid password.');
        }
    }
    user.password = body.newPassword ? body.newPassword : user.password;
    user.avatar = body.avatar ? body.avatar : user.avatar;
    user.username = body.username ? body.username : user.username;
    const updatedUser = yield user.save();
    // const updatedUser = await findUserByIdAndUpdate(params.userId, { avatar: body.avatar, password: body.newPassword, username: body.username });
    res.status(200).json(updatedUser);
}));
const deleteUserHandler = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const params = req.params;
    const user = yield (0, user_service_1.findUserByIdAndDelete)(params.userId);
    if (!user) {
        return (0, customError_1.throwError)(customError_2.HttpCode.NOT_FOUND, 'user not found');
    }
    res.status(200).json({ message: 'user deleted.' });
}));
exports.userControllers = {
    createUserHandler,
    readUserHandler,
    updateUserHandler,
    deleteUserHandler,
    readAllUsersHandler
};
