"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findUserByEmail = exports.findUserByIdAndDelete = exports.findUserByIdAndUpdate = exports.findUserById = exports.getUsers = exports.createUser = void 0;
const user_model_1 = __importDefault(require("../models/user.model"));
function createUser(user) {
    return user_model_1.default.create(user);
}
exports.createUser = createUser;
function getUsers() {
    return user_model_1.default.find().sort({ createdAt: 'desc' }).exec();
}
exports.getUsers = getUsers;
function findUserById(userId, projection = '') {
    return user_model_1.default.findById(userId).select(projection).exec();
}
exports.findUserById = findUserById;
function findUserByIdAndUpdate(userId, input, projection = '') {
    return user_model_1.default.findByIdAndUpdate(userId, input, { new: true }).select(projection).exec();
}
exports.findUserByIdAndUpdate = findUserByIdAndUpdate;
function findUserByIdAndDelete(userId) {
    return user_model_1.default.findByIdAndDelete(userId).exec();
}
exports.findUserByIdAndDelete = findUserByIdAndDelete;
function findUserByEmail(email, projection = '') {
    return user_model_1.default.findOne({ email: email }).select(projection).exec();
}
exports.findUserByEmail = findUserByEmail;
