"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const schemas_1 = require("../schemas");
const product_controller_1 = require("../controllers/product.controller");
const loader_1 = require("../authentication/passportjs/strategies/loader");
const middlewares_1 = require("../middlewares");
const router = express_1.default.Router({ mergeParams: true });
router.get('/', product_controller_1.productControllers.readAllProductsHandler);
router.get('/:productId', (0, middlewares_1.validateSchema)(schemas_1.Schemas.product.read), product_controller_1.productControllers.readProductHandler);
router.post('/', (0, loader_1.jwtAuth)(), (0, middlewares_1.validateSchema)(schemas_1.Schemas.product.create), product_controller_1.productControllers.createProductHandler);
router.patch('/:productId', (0, loader_1.jwtAuth)(), (0, middlewares_1.validateSchema)(schemas_1.Schemas.product.update), product_controller_1.productControllers.updateProductHandler);
router.delete('/:productId', (0, loader_1.jwtAuth)(), (0, middlewares_1.validateSchema)(schemas_1.Schemas.product.delete), product_controller_1.productControllers.deleteProductHandler);
exports.default = router;
