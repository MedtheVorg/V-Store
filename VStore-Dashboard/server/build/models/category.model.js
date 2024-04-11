"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const CategorySchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true
    },
    storeId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Store'
    },
    billboardId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Billboard'
    }
}, {
    versionKey: false,
    timestamps: true,
    collection: 'categories'
});
exports.default = (0, mongoose_1.model)('Category', CategorySchema);
