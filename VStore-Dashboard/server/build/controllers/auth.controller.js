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
exports.authControllers = void 0;
const jwt_1 = require("../utils/jwt");
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const customError_1 = require("../utils/customError");
const user_service_1 = require("../services/user.service");
const signInUserHandler = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const user = yield (0, user_service_1.findUserByEmail)(email);
    if (!user) {
        return (0, customError_1.throwError)(customError_1.HttpCode.BAD_REQUEST, 'Invalid Credentials');
    }
    if (!(yield user.validatePassword(password))) {
        return (0, customError_1.throwError)(customError_1.HttpCode.BAD_REQUEST, 'Invalid Credentials');
    }
    // token payload
    const payload = {
        _id: user._id,
        username: user.username,
        avatar: user.avatar
    };
    // Generate access token
    const accessToken = (0, jwt_1.signJwt)(payload, process.env.PRIVATE_KEY, '20m');
    // Generate refresh token
    const refreshToken = (0, jwt_1.signJwt)(payload, process.env.PRIVATE_KEY, '7d');
    try {
        // update the users refresh token
        const updatedUser = yield (0, user_service_1.findUserByIdAndUpdate)(payload._id.toString(), { refreshToken }, '-password -email -refreshToken');
        res.status(200).json({ user: updatedUser, accessToken });
    }
    catch (error) {
        return (0, customError_1.throwError)(customError_1.HttpCode.INTERNAL_SERVER_ERROR);
    }
}));
const logOutUserHandler = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // Terminate an existing login session.
    // req.logOut({}, () => {});
    res.status(200).json({ message: 'User logged out.' });
}));
const refreshTokenHandler = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const query = req.query;
    console.log('🚀 ~ refreshTokenHandler ~ query:', query);
    const user = yield (0, user_service_1.findUserById)(query.userId);
    console.log('🚀 ~ refreshTokenHandler ~ user:', user);
    if (!user) {
        return (0, customError_1.throwError)(customError_1.HttpCode.FORBIDDEN, 'failed to generate access token');
    }
    // validate refresh token
    if (!(0, jwt_1.verifyJwt)(user.refreshToken, process.env.PUBLIC_KEY)) {
        return (0, customError_1.throwError)(customError_1.HttpCode.FORBIDDEN, 'failed to generate access token');
    }
    const payload = {
        _id: user._id,
        username: user.username,
        avatar: user.avatar
    };
    const accessToken = (0, jwt_1.signJwt)(payload, process.env.PRIVATE_KEY, '30m');
    res.status(200).json({ accessToken });
}));
exports.authControllers = {
    signInUserHandler,
    logOutUserHandler,
    refreshTokenHandler
};
