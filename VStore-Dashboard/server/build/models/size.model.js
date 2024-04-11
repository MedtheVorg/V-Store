"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const SizeSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true
    },
    value: {
        type: String,
        required: true
    },
    storeId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Store'
    }
}, {
    versionKey: false,
    timestamps: true,
    collection: 'sizes'
});
exports.default = (0, mongoose_1.model)('Size', SizeSchema);
