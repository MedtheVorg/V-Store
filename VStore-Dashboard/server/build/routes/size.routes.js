"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const schemas_1 = require("../schemas");
const size_controller_1 = require("../controllers/size.controller");
const loader_1 = require("../authentication/passportjs/strategies/loader");
const middlewares_1 = require("../middlewares");
const router = express_1.default.Router({ mergeParams: true });
router.get('/', size_controller_1.sizeControllers.readAllSizesHandler);
router.get('/:sizeId', (0, middlewares_1.validateSchema)(schemas_1.Schemas.size.read), size_controller_1.sizeControllers.readSizeHandler);
router.post('/', (0, loader_1.jwtAuth)(), (0, middlewares_1.validateSchema)(schemas_1.Schemas.size.create), size_controller_1.sizeControllers.createSizeHandler);
router.patch('/:sizeId', (0, loader_1.jwtAuth)(), (0, middlewares_1.validateSchema)(schemas_1.Schemas.size.update), size_controller_1.sizeControllers.updateSizeHandler);
router.delete('/:sizeId', (0, loader_1.jwtAuth)(), (0, middlewares_1.validateSchema)(schemas_1.Schemas.size.delete), size_controller_1.sizeControllers.deleteSizeHandler);
exports.default = router;
