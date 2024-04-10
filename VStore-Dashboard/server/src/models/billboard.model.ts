import mongoose, { Model, Schema, model } from 'mongoose';

export interface IBillboard {
    label: string;
    imageUrl: string;
    storeId: mongoose.Types.ObjectId;
}

export type IBillboardModel = Model<IBillboard>;

const BillboardSchema = new Schema<IBillboard, IBillboardModel>(
    {
        label: {
            type: String,
            required: true
        },
        imageUrl: {
            type: String,
            required: true
        },

        storeId: {
            type: Schema.Types.ObjectId,
            ref: 'Store'
        }
    },
    {
        versionKey: false,
        timestamps: true,
        collection: 'billboards'
    }
);

export default model<IBillboard, IBillboardModel>('Billboard', BillboardSchema);
