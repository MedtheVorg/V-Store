"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyJwt = exports.signJwt = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function signJwt(userPayload, private_key, expiresIn) {
    const payload = {
        user: userPayload,
        sub: userPayload._id
    };
    return jsonwebtoken_1.default.sign(Object(payload), private_key, {
        algorithm: 'RS256',
        issuer: process.env.ISSUER,
        audience: process.env.AUDIENCE,
        expiresIn: expiresIn
    });
}
exports.signJwt = signJwt;
function verifyJwt(token, public_key) {
    try {
        const decoded = jsonwebtoken_1.default.verify(token, public_key);
        return decoded;
    }
    catch (error) {
        return null;
    }
}
exports.verifyJwt = verifyJwt;
