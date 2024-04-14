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
exports.storeControllers = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const customError_1 = require("../utils/customError");
const customError_2 = require("../utils/customError");
const store_service_1 = require("../services/store.service");
const helper_functions_1 = require("../utils/helper-functions");
const readAllStoresHandler = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const query = req.query;
    const stores = yield (0, store_service_1.getStores)({ userId: query.userId });
    res.status(200).json(stores);
}));
const readStoreHandler = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const params = req.params;
    const query = req.query;
    const store = yield (0, store_service_1.findStore)({ _id: params.storeId, userId: query.userId });
    if (store.length === 0) {
        return (0, customError_1.throwError)(customError_2.HttpCode.NOT_FOUND, 'Store not found');
    }
    res.status(200).json(store[0]);
}));
const createStoreHandler = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const store = yield (0, store_service_1.createStore)(Object.assign(Object.assign({}, body), { userId: (0, helper_functions_1.toObjectId)(body.userId) }));
    res.status(201).json(store);
}));
const updateStoreHandler = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const params = req.params;
    const store = yield (0, store_service_1.findStoreByFilterAndUpdate)({ _id: params.storeId, userId: body.userId }, { name: body.name });
    if (!store) {
        return (0, customError_1.throwError)(customError_2.HttpCode.NOT_FOUND, 'Store not found');
    }
    res.status(200).json(store);
}));
const deleteStoreHandler = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const params = req.params;
    const body = req.body;
    const store = yield (0, store_service_1.findStoreByFilterAndDelete)({ _id: params.storeId, userId: body.userId });
    if (!store) {
        return (0, customError_1.throwError)(customError_2.HttpCode.NOT_FOUND, 'Store not found.');
    }
    res.status(200).json({ message: 'store deleted.' });
}));
exports.storeControllers = {
    readAllStoresHandler,
    readStoreHandler,
    createStoreHandler,
    updateStoreHandler,
    deleteStoreHandler
};
