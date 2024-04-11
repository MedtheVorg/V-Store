"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findOrderByFilterAndDelete = exports.findOrderByFilterAndUpdate = exports.findOrder = exports.getOrders = exports.createAndSaveOrderToDatabase = void 0;
const order_model_1 = __importDefault(require("../models/order.model"));
function createAndSaveOrderToDatabase(order) {
    return order_model_1.default.create(order);
}
exports.createAndSaveOrderToDatabase = createAndSaveOrderToDatabase;
function getOrders(filter = {}) {
    return order_model_1.default.find(filter).populate('orderItems').sort({ createdAt: 'desc' }).exec();
}
exports.getOrders = getOrders;
function findOrder(filter = {}, projection = '') {
    return order_model_1.default.find(filter).select(projection).populate({ path: 'orderItems' }).exec();
}
exports.findOrder = findOrder;
function findOrderByFilterAndUpdate(filter = {}, input, projection = '') {
    return order_model_1.default.findOneAndUpdate(filter, input, { new: true }).select(projection).exec();
}
exports.findOrderByFilterAndUpdate = findOrderByFilterAndUpdate;
function findOrderByFilterAndDelete(filter = {}) {
    return order_model_1.default.findOneAndDelete(filter).exec();
}
exports.findOrderByFilterAndDelete = findOrderByFilterAndDelete;
