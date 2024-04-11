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
exports.colorControllers = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const customError_1 = require("../utils/customError");
const customError_2 = require("../utils/customError");
const color_service_1 = require("../services/color.service");
const helper_functions_1 = require("../utils/helper-functions");
const readAllColorsHandler = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const params = req.params;
    const colors = yield (0, color_service_1.getColors)({ storeId: params.storeId });
    res.status(customError_2.HttpCode.OK).json(colors);
}));
const readColorHandler = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const params = req.params;
    const color = yield (0, color_service_1.findColor)({ _id: params.colorId, storeId: params.storeId });
    if (color.length === 0) {
        return (0, customError_1.throwError)(customError_2.HttpCode.NOT_FOUND, 'Color not found');
    }
    res.status(customError_2.HttpCode.OK).json(color[0]);
}));
const createColorHandler = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const params = req.params;
    const color = yield (0, color_service_1.createColor)(Object.assign(Object.assign({}, body), { storeId: (0, helper_functions_1.toObjectId)(params.storeId) }));
    res.status(201).json(color);
}));
const updateColorHandler = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const params = req.params;
    const color = yield (0, color_service_1.findColorByFilterAndUpdate)({ _id: params.colorId, storeId: params.storeId }, { name: body.name, value: body.value });
    if (!color) {
        return (0, customError_1.throwError)(customError_2.HttpCode.NOT_FOUND, 'Color not found');
    }
    res.status(customError_2.HttpCode.OK).json(color);
}));
const deleteColorHandler = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const params = req.params;
    const color = yield (0, color_service_1.findColorByFilterAndDelete)({ _id: params.colorId, storeId: params.storeId });
    if (!color) {
        return (0, customError_1.throwError)(customError_2.HttpCode.NOT_FOUND, 'Color not found.');
    }
    res.status(customError_2.HttpCode.OK).json({ message: 'Color deleted.' });
}));
exports.colorControllers = {
    readAllColorsHandler,
    readColorHandler,
    createColorHandler,
    updateColorHandler,
    deleteColorHandler
};
