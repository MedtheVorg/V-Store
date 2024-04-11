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
exports.billboardControllers = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const customError_1 = require("../utils/customError");
const customError_2 = require("../utils/customError");
const billboard_service_1 = require("../services/billboard.service");
const helper_functions_1 = require("../utils/helper-functions");
const readAllBillboardsHandler = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const params = req.params;
    const billboards = yield (0, billboard_service_1.getBillboards)({ storeId: params.storeId });
    res.status(customError_2.HttpCode.OK).json(billboards);
}));
const readBillboardHandler = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const params = req.params;
    const billboard = yield (0, billboard_service_1.findBillboard)({ _id: params.billboardId, storeId: params.storeId });
    if (billboard.length === 0) {
        return (0, customError_1.throwError)(customError_2.HttpCode.NOT_FOUND, 'Billboard not found');
    }
    res.status(customError_2.HttpCode.OK).json(billboard[0]);
}));
const createBillboardHandler = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const params = req.params;
    const billboard = yield (0, billboard_service_1.createBillboard)(Object.assign(Object.assign({}, body), { storeId: (0, helper_functions_1.toObjectId)(params.storeId) }));
    res.status(201).json(billboard);
}));
const updateBillboardHandler = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const params = req.params;
    const billboard = yield (0, billboard_service_1.findBillboardByFilterAndUpdate)({ _id: params.billboardId, storeId: params.storeId }, { label: body.label, imageUrl: body.imageUrl });
    if (!billboard) {
        return (0, customError_1.throwError)(customError_2.HttpCode.NOT_FOUND, 'Billboard not found');
    }
    res.status(customError_2.HttpCode.OK).json(billboard);
}));
const deleteBillboardHandler = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const params = req.params;
    const billboard = yield (0, billboard_service_1.findBillboardByFilterAndDelete)({ _id: params.billboardId, storeId: params.storeId });
    if (!billboard) {
        return (0, customError_1.throwError)(customError_2.HttpCode.NOT_FOUND, 'Billboard not found.');
    }
    res.status(customError_2.HttpCode.OK).json({ message: 'billboard deleted.' });
}));
exports.billboardControllers = {
    readAllBillboardsHandler,
    readBillboardHandler,
    createBillboardHandler,
    updateBillboardHandler,
    deleteBillboardHandler
};
