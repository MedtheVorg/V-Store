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
exports.sizeControllers = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const customError_1 = require("../utils/customError");
const customError_2 = require("../utils/customError");
const size_service_1 = require("../services/size.service");
const helper_functions_1 = require("../utils/helper-functions");
const readAllSizesHandler = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const params = req.params;
    const sizes = yield (0, size_service_1.getSizes)({ storeId: params.storeId });
    res.status(customError_2.HttpCode.OK).json(sizes);
}));
const readSizeHandler = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const params = req.params;
    const size = yield (0, size_service_1.findSize)({ _id: params.sizeId, storeId: params.storeId });
    if (size.length === 0) {
        return (0, customError_1.throwError)(customError_2.HttpCode.NOT_FOUND, 'Size not found');
    }
    res.status(customError_2.HttpCode.OK).json(size[0]);
}));
const createSizeHandler = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const params = req.params;
    const size = yield (0, size_service_1.createSize)(Object.assign(Object.assign({}, body), { storeId: (0, helper_functions_1.toObjectId)(params.storeId) }));
    res.status(201).json(size);
}));
const updateSizeHandler = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const params = req.params;
    const size = yield (0, size_service_1.findSizeByFilterAndUpdate)({ _id: params.sizeId, storeId: params.storeId }, { name: body.name, value: body.value });
    if (!size) {
        return (0, customError_1.throwError)(customError_2.HttpCode.NOT_FOUND, 'Size not found');
    }
    res.status(customError_2.HttpCode.OK).json(size);
}));
const deleteSizeHandler = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const params = req.params;
    const size = yield (0, size_service_1.findSizeByFilterAndDelete)({ _id: params.sizeId, storeId: params.storeId });
    if (!size) {
        return (0, customError_1.throwError)(customError_2.HttpCode.NOT_FOUND, 'Size not found.');
    }
    res.status(customError_2.HttpCode.OK).json({ message: 'size deleted.' });
}));
exports.sizeControllers = {
    readAllSizesHandler,
    readSizeHandler,
    createSizeHandler,
    updateSizeHandler,
    deleteSizeHandler
};
