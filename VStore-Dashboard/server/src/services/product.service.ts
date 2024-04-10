import { UpdateProductInput } from '../schemas';
import { IProduct } from '../models/product.model';
import Product from '../models/product.model';

export function createProduct(product: IProduct) {
    return Product.create(product);
}

export function getProducts(filter: Record<string, any>) {
    const cleanedFilter: Record<string, any> = {};
    for (const key in filter) {
        if (filter[key] !== undefined) {
            cleanedFilter[key] = filter[key];
        }
    }

    return Product.find(cleanedFilter).populate('category').populate('size').populate('color').sort({ createdAt: 'desc' }).exec();
}

export function findProduct(filter = {}, populateBy?: string[], projection = '') {
    return Product.find(filter).select(projection).populate('category').populate('size').populate('color').exec();
}

export function findProductByFilterAndUpdate(filter = {}, input: Partial<UpdateProductInput>, projection = '') {
    return Product.findOneAndUpdate(filter, input, { new: true }).select(projection).exec();
}
export function findProductByFilterAndDelete(filter = {}) {
    return Product.findOneAndDelete(filter).exec();
}
