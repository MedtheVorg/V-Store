import mongoose, { Model, Schema, model } from 'mongoose';

export interface IImage {
    url: string;
}

export interface IProduct {
    name: string;
    price: number;
    isFeatured?: boolean;
    isArchived?: boolean;
    images: IImage[];
    category: mongoose.Types.ObjectId;
    size: mongoose.Types.ObjectId;
    color: mongoose.Types.ObjectId;
    storeId: mongoose.Types.ObjectId;
}

export type IProductModel = Model<IProduct>;

const ProductSchema = new Schema<IProduct, IProductModel>(
    {
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
            type: Schema.Types.ObjectId,
            ref: 'Store'
        },
        category: {
            type: Schema.Types.ObjectId,
            ref: 'Category'
        },
        size: {
            type: Schema.Types.ObjectId,
            ref: 'Size'
        },
        color: {
            type: Schema.Types.ObjectId,
            ref: 'Color'
        }
    },
    {
        versionKey: false,
        timestamps: true,
        collection: 'products'
    }
);

export default model<IProduct, IProductModel>('Product', ProductSchema);
