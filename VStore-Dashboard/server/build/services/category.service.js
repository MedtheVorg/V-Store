"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findCategoryByFilterAndDelete = exports.findCategoryByFilterAndUpdate = exports.findCategory = exports.getCategories = exports.createCategory = void 0;
const category_model_1 = __importDefault(require("../models/category.model"));
function createCategory(category) {
    return category_model_1.default.create(category);
}
exports.createCategory = createCategory;
function getCategories(filter = {}) {
    return category_model_1.default.find(filter).populate('billboardId').sort({ createdAt: 'desc' }).exec();
}
exports.getCategories = getCategories;
function findCategory(filter = {}, projection = '') {
    return category_model_1.default.find(filter).populate('billboardId').select(projection).exec();
}
exports.findCategory = findCategory;
function findCategoryByFilterAndUpdate(filter = {}, input, projection = '') {
    return category_model_1.default.findOneAndUpdate(filter, input, { new: true }).select(projection).exec();
}
exports.findCategoryByFilterAndUpdate = findCategoryByFilterAndUpdate;
function findCategoryByFilterAndDelete(filter = {}) {
    return category_model_1.default.findOneAndDelete(filter).exec();
}
exports.findCategoryByFilterAndDelete = findCategoryByFilterAndDelete;
