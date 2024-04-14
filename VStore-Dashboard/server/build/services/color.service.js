"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findColorByFilterAndDelete = exports.findColorByFilterAndUpdate = exports.findColor = exports.getColors = exports.createColor = void 0;
const color_model_1 = __importDefault(require("../models/color.model"));
function createColor(color) {
    return color_model_1.default.create(color);
}
exports.createColor = createColor;
function getColors(filter = {}) {
    return color_model_1.default.find(filter).sort({ createdAt: 'desc' }).exec();
}
exports.getColors = getColors;
function findColor(filter = {}, projection = '') {
    return color_model_1.default.find(filter).select(projection).exec();
}
exports.findColor = findColor;
function findColorByFilterAndUpdate(filter = {}, input, projection = '') {
    return color_model_1.default.findOneAndUpdate(filter, input, { new: true }).select(projection).exec();
}
exports.findColorByFilterAndUpdate = findColorByFilterAndUpdate;
function findColorByFilterAndDelete(filter = {}) {
    return color_model_1.default.findOneAndDelete(filter).exec();
}
exports.findColorByFilterAndDelete = findColorByFilterAndDelete;
