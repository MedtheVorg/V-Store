"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.jwtAuth = void 0;
require("./jwt-strategy");
const passport_1 = __importDefault(require("passport"));
const customError_1 = require("../../../utils/customError");
function jwtAuth() {
    return function (req, res, next) {
        const accessToken = req.header('authorization');
        if (!accessToken) {
            return (0, customError_1.throwError)(customError_1.HttpCode.UNAUTHORIZED, 'No auth token provided');
        }
        passport_1.default.authenticate('jwtStrategy', { session: false }, function (err, user, info, status) {
            if (err) {
                // check for custom thrown errors
                return next(err);
            }
            if ((info === null || info === void 0 ? void 0 : info.name) === 'TokenExpiredError') {
                // check for token expired error
                return (0, customError_1.throwError)(customError_1.HttpCode.UNAUTHORIZED, 'jwt expired');
            }
            next();
        })(req, res, next);
    };
}
exports.jwtAuth = jwtAuth;
