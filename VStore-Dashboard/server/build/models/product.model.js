"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const ProductSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    isFeatured: {
        type: Boolean,
        default: false
    },
    isArchived: {
        type: Boolean,
        default: false
    },
    images: [
        {
            url: {
                type: String,
                required: true
            }
        }
    ],
    storeId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Store'
    },
    category: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Category'
    },
    size: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Size'
    },
    color: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Color'
    }
}, {
    versionKey: false,
    timestamps: true,
    collection: 'products'
});
exports.default = (0, mongoose_1.model)('Product', ProductSchema);
