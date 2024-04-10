import mongoose from 'mongoose';
import { Model, Schema, model } from 'mongoose';

export interface IOrder {
    isPaid?: boolean;
    orderItems: mongoose.Types.ObjectId[];
    storeId: mongoose.Types.ObjectId;
    phone?: string;
    address?: string;
    paypalOrderId: string;
}

export type IOrderModel = Model<IOrder>;

const OrderSchema = new Schema<IOrder, IOrderModel>(
    {
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
        orderItems: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
        storeId: {
            type: Schema.Types.ObjectId,
            ref: 'Store'
        },
        paypalOrderId: {
            type: String,
            required: true
        }
    },
    {
        versionKey: false,
        timestamps: true,
        collection: 'orders'
    }
);

export default model<IOrder, IOrderModel>('Order', OrderSchema);
