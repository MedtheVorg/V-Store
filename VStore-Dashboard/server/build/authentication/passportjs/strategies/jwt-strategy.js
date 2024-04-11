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
const user_service_1 = require("../../../services/user.service");
const passport_1 = __importDefault(require("passport"));
const passport_jwt_1 = require("passport-jwt");
passport_1.default.use('jwtStrategy', new passport_jwt_1.Strategy({
    secretOrKey: process.env.PUBLIC_KEY, // verification public key
    algorithms: ['RS256'], // encryption algorithm
    issuer: process.env.ISSUER, // original issuer
    audience: process.env.AUDIENCE,
    ignoreExpiration: false,
    jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken() // function used to extract jwt and pass it to the callback
}, (payload, done) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        logging.warn(`the wjt Payload : ${payload}`);
        const user = yield (0, user_service_1.findUserById)(payload.sub);
        if (!user) {
            return done(null, false, 'UnAuthorized');
        }
        return done(null, user);
    }
    catch (error) {
        return done(error, false, 'Jwt Authentication failed');
    }
})));
