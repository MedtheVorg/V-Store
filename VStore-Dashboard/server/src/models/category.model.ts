import mongoose, { Model, Schema, model } from 'mongoose';

export interface ICategory {
    name: string;
    storeId: mongoose.Types.ObjectId;
    billboardId: mongoose.Types.ObjectId;
}

export type ICategoryModel = Model<ICategory>;

const CategorySchema = new Schema<ICategory, ICategoryModel>(
    {
        name: {
            type: String,
            required: true
        },
        storeId: {
            type: Schema.Types.ObjectId,
            ref: 'Store'
        },
        billboardId: {
            type: Schema.Types.ObjectId,
            ref: 'Billboard'
        }
    },
    {
        versionKey: false,
        timestamps: true,
        collection: 'categories'
    }
);

export default model<ICategory, ICategoryModel>('Category', CategorySchema);
