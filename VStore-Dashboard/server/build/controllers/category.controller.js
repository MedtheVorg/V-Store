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
exports.categoryControllers = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const customError_1 = require("../utils/customError");
const customError_2 = require("../utils/customError");
const category_service_1 = require("../services/category.service");
const helper_functions_1 = require("../utils/helper-functions");
const readAllCategoriesHandler = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const params = req.params;
    const categories = yield (0, category_service_1.getCategories)({ storeId: params.storeId });
    res.status(customError_2.HttpCode.OK).json(categories);
}));
const readCategoryHandler = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const params = req.params;
    const category = yield (0, category_service_1.findCategory)({ _id: params.categoryId, storeId: params.storeId });
    if (category.length === 0) {
        return (0, customError_1.throwError)(customError_2.HttpCode.NOT_FOUND, 'Category not found');
    }
    res.status(customError_2.HttpCode.OK).json(category[0]);
}));
const createCategoryHandler = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const params = req.params;
    console.log('category id :', params.storeId);
    const category = yield (0, category_service_1.createCategory)(Object.assign(Object.assign({}, body), { storeId: (0, helper_functions_1.toObjectId)(params.storeId), billboardId: (0, helper_functions_1.toObjectId)(body.billboardId) }));
    res.status(201).json(category);
}));
const updateCategoryHandler = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const params = req.params;
    const category = yield (0, category_service_1.findCategoryByFilterAndUpdate)({ _id: params.categoryId, storeId: params.storeId }, { name: body.name, billboardId: body.billboardId });
    if (!category) {
        return (0, customError_1.throwError)(customError_2.HttpCode.NOT_FOUND, 'Category not found');
    }
    res.status(customError_2.HttpCode.OK).json(category);
}));
const deleteCategoryHandler = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const params = req.params;
    const category = yield (0, category_service_1.findCategoryByFilterAndDelete)({ _id: params.categoryId, storeId: params.storeId });
    if (!category) {
        return (0, customError_1.throwError)(customError_2.HttpCode.NOT_FOUND, 'Category not found.');
    }
    res.status(customError_2.HttpCode.OK).json({ message: 'Category deleted.' });
}));
exports.categoryControllers = {
    readAllCategoriesHandler,
    readCategoryHandler,
    createCategoryHandler,
    updateCategoryHandler,
    deleteCategoryHandler
};
