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
exports.productControllers = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const customError_1 = require("../utils/customError");
const customError_2 = require("../utils/customError");
const product_service_1 = require("../services/product.service");
const helper_functions_1 = require("../utils/helper-functions");
const readAllProductsHandler = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const params = req.params;
    const query = req.query;
    const category = query.categoryId || undefined;
    const color = query.colorId || undefined;
    const size = query.sizeId || undefined;
    const isFeatured = query.isFeatured ? true : undefined;
    const products = yield (0, product_service_1.getProducts)({
        storeId: params.storeId,
        category,
        color,
        size,
        isFeatured
    });
    res.status(customError_2.HttpCode.OK).json(products);
}));
const readProductHandler = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const params = req.params;
    const product = yield (0, product_service_1.findProduct)({ _id: params.productId, storeId: params.storeId });
    if (product.length === 0) {
        return (0, customError_1.throwError)(customError_2.HttpCode.NOT_FOUND, 'Product not found');
    }
    res.status(customError_2.HttpCode.OK).json(product[0]);
}));
const createProductHandler = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const params = req.params;
    const product = yield (0, product_service_1.createProduct)(Object.assign(Object.assign({}, body), { storeId: (0, helper_functions_1.toObjectId)(params.storeId), category: (0, helper_functions_1.toObjectId)(body.category), size: (0, helper_functions_1.toObjectId)(body.size), color: (0, helper_functions_1.toObjectId)(body.color) }));
    res.status(201).json(product);
}));
const updateProductHandler = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const params = req.params;
    const product = yield (0, product_service_1.findProductByFilterAndUpdate)({ _id: params.productId, storeId: params.storeId }, {
        name: body.name,
        price: body.price,
        images: body.images,
        category: body.category,
        size: body.size,
        color: body.color,
        isFeatured: body.isFeatured,
        isArchived: body.isArchived
    });
    if (!product) {
        return (0, customError_1.throwError)(customError_2.HttpCode.NOT_FOUND, 'Product not found');
    }
    res.status(customError_2.HttpCode.OK).json(product);
}));
const deleteProductHandler = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const params = req.params;
    const product = yield (0, product_service_1.findProductByFilterAndDelete)({ _id: params.productId, storeId: params.storeId });
    if (!product) {
        return (0, customError_1.throwError)(customError_2.HttpCode.NOT_FOUND, 'Product not found.');
    }
    res.status(customError_2.HttpCode.OK).json({ message: 'product deleted.' });
}));
exports.productControllers = {
    readAllProductsHandler,
    readProductHandler,
    createProductHandler,
    updateProductHandler,
    deleteProductHandler
};
