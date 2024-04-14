"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const schemas_1 = require("../schemas");
const user_controller_1 = require("../controllers/user.controller");
const loader_1 = require("../authentication/passportjs/strategies/loader");
const middlewares_1 = require("../middlewares");
const router = express_1.default.Router();
router.get('/', user_controller_1.userControllers.readAllUsersHandler);
router.get('/:userId', (0, middlewares_1.validateSchema)(schemas_1.Schemas.user.read), user_controller_1.userControllers.readUserHandler);
router.post('/', (0, middlewares_1.validateSchema)(schemas_1.Schemas.user.create), user_controller_1.userControllers.createUserHandler);
router.patch('/:userId', (0, loader_1.jwtAuth)(), (0, middlewares_1.validateSchema)(schemas_1.Schemas.user.update), user_controller_1.userControllers.updateUserHandler);
router.delete('/:userId', (0, loader_1.jwtAuth)(), (0, middlewares_1.validateSchema)(schemas_1.Schemas.user.delete), user_controller_1.userControllers.deleteUserHandler);
exports.default = router;
