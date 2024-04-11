"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_controller_1 = require("../controllers/auth.controller");
const middlewares_1 = require("../middlewares");
const schemas_1 = require("../schemas");
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
router.post('/', (0, middlewares_1.validateSchema)(schemas_1.Schemas.user.signin), auth_controller_1.authControllers.signInUserHandler);
router.post('/logout', auth_controller_1.authControllers.logOutUserHandler);
router.get('/refreshToken', auth_controller_1.authControllers.refreshTokenHandler);
exports.default = router;
