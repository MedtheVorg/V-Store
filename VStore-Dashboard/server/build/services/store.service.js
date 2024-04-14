"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findStoreByName = exports.findStoreByFilterAndDelete = exports.findStoreByFilterAndUpdate = exports.findStore = exports.getStores = exports.createStore = void 0;
const store_model_1 = __importDefault(require("../models/store.model"));
function createStore(store) {
    return store_model_1.default.create(store);
}
exports.createStore = createStore;
function getStores(filter = {}) {
    return store_model_1.default.find(filter).sort({ createdAt: 'desc' }).exec();
}
exports.getStores = getStores;
function findStore(filter = {}, projection = '') {
    return store_model_1.default.find(filter).select(projection).exec();
}
exports.findStore = findStore;
function findStoreByFilterAndUpdate(filter = {}, input, projection = '') {
    return store_model_1.default.findOneAndUpdate(filter, input, { new: true }).select(projection).exec();
}
exports.findStoreByFilterAndUpdate = findStoreByFilterAndUpdate;
function findStoreByFilterAndDelete(filter = {}) {
    return store_model_1.default.findOneAndDelete(filter).exec();
}
exports.findStoreByFilterAndDelete = findStoreByFilterAndDelete;
function findStoreByName(name, projection = '') {
    return store_model_1.default.findOne({ name: name }).select(projection).exec();
}
exports.findStoreByName = findStoreByName;
