import mongoose, { Model, Schema, model } from 'mongoose';

export interface ISize {
    name: string;
    value: string;
    storeId: mongoose.Types.ObjectId;
}

export type ISizeModel = Model<ISize>;

const SizeSchema = new Schema<ISize, ISizeModel>(
    {
        name: {
            type: String,
            required: true
        },
        value: {
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
        collection: 'sizes'
    }
);

export default model<ISize, ISizeModel>('Size', SizeSchema);
