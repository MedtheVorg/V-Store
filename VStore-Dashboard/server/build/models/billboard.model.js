"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const BillboardSchema = new mongoose_1.Schema({
    label: {
        type: String,
        required: true
    },
    imageUrl: {
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
    collection: 'billboards'
});
exports.default = (0, mongoose_1.model)('Billboard', BillboardSchema);
