import mongoose, { Model, Schema, model } from 'mongoose';

export interface IStore {
    name: string;
    userId: mongoose.Types.ObjectId;
}

export type IStoreModel = Model<IStore>;

const StoreSchema = new Schema<IStore, IStoreModel>(
    {
        name: {
            type: String,
            required: true
        },

        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    },
    {
        versionKey: false,
        timestamps: true,
        collection: 'stores'
    }
);

// deleted all store related models (products,billboards,categories,sizes,colors,orders,orderItems)
StoreSchema.pre('deleteOne',function(this: mongoose.Query<IStore,IStoreModel>){
    // const storeId = this.
})

export default model<IStore, IStoreModel>('Store', StoreSchema);
