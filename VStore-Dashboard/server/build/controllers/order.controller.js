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
exports.orderControllers = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const customError_1 = require("../utils/customError");
const customError_2 = require("../utils/customError");
const order_service_1 = require("../services/order.service");
const helper_functions_1 = require("../utils/helper-functions");
const product_service_1 = require("../services/product.service");
require("../utils/paypal-api");
const paypal_api_1 = require("../utils/paypal-api");
const readAllOrdersHandler = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const params = req.params;
    const orders = yield (0, order_service_1.getOrders)({ storeId: params.storeId });
    res.status(customError_2.HttpCode.OK).json(orders);
}));
const readOrderHandler = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const params = req.params;
    const order = yield (0, order_service_1.findOrder)({ _id: params.orderId, storeId: params.storeId });
    if (order.length === 0) {
        return (0, customError_1.throwError)(customError_2.HttpCode.NOT_FOUND, 'Order not found');
    }
    res.status(customError_2.HttpCode.OK).json(order[0]);
}));
const createOrderHandler = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const params = req.params;
    const order = yield (0, order_service_1.createAndSaveOrderToDatabase)(Object.assign(Object.assign({}, body), { storeId: (0, helper_functions_1.toObjectId)(params.storeId), orderItems: [...body.orderItems.map((order) => (0, helper_functions_1.toObjectId)(order))] }));
    res.status(201).json(order);
}));
const deleteOrderHandler = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const params = req.params;
    const order = yield (0, order_service_1.findOrderByFilterAndDelete)({ _id: params.orderId, storeId: params.storeId });
    if (!order) {
        return (0, customError_1.throwError)(customError_2.HttpCode.NOT_FOUND, 'Order not found.');
    }
    res.status(customError_2.HttpCode.OK).json({ message: 'order deleted.' });
}));
// Paypal Payment Controllers
const checkoutOrderHandler = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { cartDetails, storeId, customerDetails } = req.body;
    // save order items ids to save later to the order  model in our database
    const orderItems_Ids = cartDetails.map((item) => (0, helper_functions_1.toObjectId)(item._id));
    let orderProducts;
    try {
        // fetch products by id from database
        orderProducts = yield (0, product_service_1.getProducts)({ _id: { $in: orderItems_Ids } });
        // calculate order total price
        const orderTotal = orderProducts.reduce((total, product) => total + product.price, 0);
        // Generate order payload
        const createOrderPayload = {
            // set intent mode
            intent: 'CAPTURE',
            // set order details
            purchase_units: [
                {
                    // order total after taxes,insurance...etc
                    amount: {
                        value: String(orderTotal),
                        currency_code: 'USD',
                        // how was the order total Calculated
                        breakdown: {
                            item_total: {
                                currency_code: 'USD',
                                value: String(orderTotal)
                            },
                            discount: {
                                value: '0',
                                currency_code: 'USD'
                            },
                            shipping: {
                                value: '0',
                                currency_code: 'USD'
                            },
                            handling: {
                                value: '0',
                                currency_code: 'USD'
                            },
                            insurance: {
                                value: '0',
                                currency_code: 'USD'
                            },
                            shipping_discount: {
                                value: '0',
                                currency_code: 'USD'
                            },
                            tax_total: {
                                value: '0',
                                currency_code: 'USD'
                            }
                        }
                    },
                    // order items
                    items: orderProducts.map((product) => ({
                        name: product.name,
                        quantity: '1',
                        category: 'PHYSICAL_GOODS',
                        unit_amount: { value: String(product.price), currency_code: 'USD' }
                    }))
                }
            ]
        };
        // send the request to Paypal Rest API
        const createOrderResponse = yield (0, paypal_api_1.createPaypalOrder)(createOrderPayload);
        // update the database
        const savedOrder = yield (0, order_service_1.createAndSaveOrderToDatabase)({
            storeId: (0, helper_functions_1.toObjectId)(storeId),
            orderItems: orderItems_Ids,
            paypalOrderId: createOrderResponse.id,
            address: customerDetails.address,
            phone: customerDetails.phone
        });
        // send  the order ID back to the client to complete the checkout process
        res.status(201).json(createOrderResponse);
    }
    catch (error) {
        return (0, customError_1.throwError)(customError_2.HttpCode.INTERNAL_SERVER_ERROR, 'Payment Process Failed');
    }
}));
const captureOrderHandler = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { orderId } = req.body;
    const { storeId } = req.params;
    try {
        // Capture the order
        const captureOrderResponse = yield (0, paypal_api_1.captureOrder)(orderId);
        // update order and make it as paid
        const confirmedOrder = yield (0, order_service_1.findOrderByFilterAndUpdate)({ paypalOrderId: orderId, storeId: storeId }, { isPaid: true });
        // mark order products as archived and unFeatured
        if (confirmedOrder && ((_a = confirmedOrder.orderItems) === null || _a === void 0 ? void 0 : _a.length) > 0) {
            for (let i = 0; i < (confirmedOrder === null || confirmedOrder === void 0 ? void 0 : confirmedOrder.orderItems.length); i++) {
                const productId = confirmedOrder === null || confirmedOrder === void 0 ? void 0 : confirmedOrder.orderItems[i]._id;
                yield (0, product_service_1.findProductByFilterAndUpdate)({ _id: productId }, { isArchived: true, isFeatured: false });
            }
        }
        res.json({ success: true });
    }
    catch (error) {
        return (0, customError_1.throwError)(customError_2.HttpCode.INTERNAL_SERVER_ERROR, 'failed to capture the order details');
    }
}));
exports.orderControllers = {
    readAllOrdersHandler,
    readOrderHandler,
    createOrderHandler,
    deleteOrderHandler,
    checkoutOrderHandler,
    captureOrderHandler
};
