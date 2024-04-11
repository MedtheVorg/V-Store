"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findBillboardByFilterAndDelete = exports.findBillboardByFilterAndUpdate = exports.findBillboard = exports.getBillboards = exports.createBillboard = void 0;
const billboard_model_1 = __importDefault(require("../models/billboard.model"));
function createBillboard(billboard) {
    return billboard_model_1.default.create(billboard);
}
exports.createBillboard = createBillboard;
function getBillboards(filter = {}) {
    return billboard_model_1.default.find(filter).sort({ createdAt: 'descending' }).exec();
}
exports.getBillboards = getBillboards;
function findBillboard(filter = {}, projection = '') {
    return billboard_model_1.default.find(filter).select(projection).exec();
}
exports.findBillboard = findBillboard;
function findBillboardByFilterAndUpdate(filter = {}, input, projection = '') {
    return billboard_model_1.default.findOneAndUpdate(filter, input, { new: true }).select(projection).exec();
}
exports.findBillboardByFilterAndUpdate = findBillboardByFilterAndUpdate;
function findBillboardByFilterAndDelete(filter = {}) {
    return billboard_model_1.default.findOneAndDelete(filter).exec();
}
exports.findBillboardByFilterAndDelete = findBillboardByFilterAndDelete;
