"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const schemas_1 = require("../schemas");
const order_controller_1 = require("../controllers/order.controller");
const loader_1 = require("../authentication/passportjs/strategies/loader");
const middlewares_1 = require("../middlewares");
const router = express_1.default.Router({ mergeParams: true });
router.get('/', order_controller_1.orderControllers.readAllOrdersHandler);
router.get('/:orderId', (0, middlewares_1.validateSchema)(schemas_1.Schemas.order.read), order_controller_1.orderControllers.readOrderHandler);
router.post('/', (0, middlewares_1.validateSchema)(schemas_1.Schemas.order.create), order_controller_1.orderControllers.createOrderHandler);
router.delete('/:orderId', (0, loader_1.jwtAuth)(), (0, middlewares_1.validateSchema)(schemas_1.Schemas.order.delete), order_controller_1.orderControllers.deleteOrderHandler);
// paypal payment routes
router.post('/checkout', order_controller_1.orderControllers.checkoutOrderHandler);
router.post('/capture', order_controller_1.orderControllers.captureOrderHandler);
exports.default = router;
