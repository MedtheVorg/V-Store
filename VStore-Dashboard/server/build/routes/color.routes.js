"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const schemas_1 = require("../schemas");
const color_controller_1 = require("../controllers/color.controller");
const loader_1 = require("../authentication/passportjs/strategies/loader");
const middlewares_1 = require("../middlewares");
const router = express_1.default.Router({ mergeParams: true });
router.get('/', color_controller_1.colorControllers.readAllColorsHandler);
router.get('/:colorId', (0, middlewares_1.validateSchema)(schemas_1.Schemas.color.read), color_controller_1.colorControllers.readColorHandler);
router.post('/', (0, loader_1.jwtAuth)(), (0, middlewares_1.validateSchema)(schemas_1.Schemas.color.create), color_controller_1.colorControllers.createColorHandler);
router.patch('/:colorId', (0, loader_1.jwtAuth)(), (0, middlewares_1.validateSchema)(schemas_1.Schemas.color.update), color_controller_1.colorControllers.updateColorHandler);
router.delete('/:colorId', (0, loader_1.jwtAuth)(), (0, middlewares_1.validateSchema)(schemas_1.Schemas.color.delete), color_controller_1.colorControllers.deleteColorHandler);
exports.default = router;
