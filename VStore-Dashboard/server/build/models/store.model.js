"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const StoreSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    versionKey: false,
    timestamps: true,
    collection: 'stores'
});
// deleted all store related models (products,billboards,categories,sizes,colors,orders,orderItems)
StoreSchema.pre('deleteOne', function () {
    // const storeId = this.
});
exports.default = (0, mongoose_1.model)('Store', StoreSchema);
