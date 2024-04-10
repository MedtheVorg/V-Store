import mongoose, { Model, Schema, model } from 'mongoose';

export interface IColor {
    name: string;
    value: string;
    storeId: mongoose.Types.ObjectId;
}

export type IColorModel = Model<IColor>;

const ColorSchema = new Schema<IColor, IColorModel>(
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
        collection: 'colors'
    }
);

export default model<IColor, IColorModel>('Color', ColorSchema);
