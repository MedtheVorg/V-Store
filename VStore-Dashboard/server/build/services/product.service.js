"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findProductByFilterAndDelete = exports.findProductByFilterAndUpdate = exports.findProduct = exports.getProducts = exports.createProduct = void 0;
const product_model_1 = __importDefault(require("../models/product.model"));
function createProduct(product) {
    return product_model_1.default.create(product);
}
exports.createProduct = createProduct;
function getProducts(filter) {
    const cleanedFilter = {};
    for (const key in filter) {
        if (filter[key] !== undefined) {
            cleanedFilter[key] = filter[key];
        }
    }
    return product_model_1.default.find(cleanedFilter).populate('category').populate('size').populate('color').sort({ createdAt: 'desc' }).exec();
}
exports.getProducts = getProducts;
function findProduct(filter = {}, populateBy, projection = '') {
    return product_model_1.default.find(filter).select(projection).populate('category').populate('size').populate('color').exec();
}
exports.findProduct = findProduct;
function findProductByFilterAndUpdate(filter = {}, input, projection = '') {
    return product_model_1.default.findOneAndUpdate(filter, input, { new: true }).select(projection).exec();
}
exports.findProductByFilterAndUpdate = findProductByFilterAndUpdate;
function findProductByFilterAndDelete(filter = {}) {
    return product_model_1.default.findOneAndDelete(filter).exec();
}
exports.findProductByFilterAndDelete = findProductByFilterAndDelete;
