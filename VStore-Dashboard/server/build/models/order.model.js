"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const OrderSchema = new mongoose_1.Schema({
    isPaid: {
        type: Boolean,
        default: false
    },
    phone: {
        type: String,
        default: ''
    },
    address: {
        type: String,
        default: ''
    },
    orderItems: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'Product' }],
    storeId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Store'
    },
    paypalOrderId: {
        type: String,
        required: true
    }
}, {
    versionKey: false,
    timestamps: true,
    collection: 'orders'
});
exports.default = (0, mongoose_1.model)('Order', OrderSchema);
