"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const schemas_1 = require("../schemas");
const billboard_controller_1 = require("../controllers/billboard.controller");
const loader_1 = require("../authentication/passportjs/strategies/loader");
const middlewares_1 = require("../middlewares");
const router = express_1.default.Router({ mergeParams: true });
router.get('/', billboard_controller_1.billboardControllers.readAllBillboardsHandler);
router.get('/:billboardId', (0, middlewares_1.validateSchema)(schemas_1.Schemas.billboard.read), billboard_controller_1.billboardControllers.readBillboardHandler);
router.post('/', (0, middlewares_1.validateSchema)(schemas_1.Schemas.billboard.create), billboard_controller_1.billboardControllers.createBillboardHandler);
router.patch('/:billboardId', (0, loader_1.jwtAuth)(), (0, middlewares_1.validateSchema)(schemas_1.Schemas.billboard.update), billboard_controller_1.billboardControllers.updateBillboardHandler);
router.delete('/:billboardId', (0, loader_1.jwtAuth)(), (0, middlewares_1.validateSchema)(schemas_1.Schemas.billboard.delete), billboard_controller_1.billboardControllers.deleteBillboardHandler);
exports.default = router;
