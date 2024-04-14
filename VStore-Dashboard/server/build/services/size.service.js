"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findSizeByFilterAndDelete = exports.findSizeByFilterAndUpdate = exports.findSize = exports.getSizes = exports.createSize = void 0;
const size_model_1 = __importDefault(require("../models/size.model"));
function createSize(size) {
    return size_model_1.default.create(size);
}
exports.createSize = createSize;
function getSizes(filter = {}) {
    return size_model_1.default.find(filter).sort({ createdAt: 'desc' }).exec();
}
exports.getSizes = getSizes;
function findSize(filter = {}, projection = '') {
    return size_model_1.default.find(filter).select(projection).exec();
}
exports.findSize = findSize;
function findSizeByFilterAndUpdate(filter = {}, input, projection = '') {
    return size_model_1.default.findOneAndUpdate(filter, input, { new: true }).select(projection).exec();
}
exports.findSizeByFilterAndUpdate = findSizeByFilterAndUpdate;
function findSizeByFilterAndDelete(filter = {}) {
    return size_model_1.default.findOneAndDelete(filter).exec();
}
exports.findSizeByFilterAndDelete = findSizeByFilterAndDelete;
