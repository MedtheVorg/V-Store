import { UpdateCategoryInput } from '../schemas';
import { ICategory } from '../models/category.model';
import Category from '../models/category.model';

export function createCategory(category: ICategory) {
    return Category.create(category);
}

export function getCategories(filter = {}) {
    return Category.find(filter).populate('billboardId').sort({ createdAt: 'desc' }).exec();
}

export function findCategory(filter = {}, projection = '') {
    return Category.find(filter).populate('billboardId').select(projection).exec();
}

export function findCategoryByFilterAndUpdate(filter = {}, input: Partial<UpdateCategoryInput>, projection = '') {
    return Category.findOneAndUpdate(filter, input, { new: true }).select(projection).exec();
}
export function findCategoryByFilterAndDelete(filter = {}) {
    return Category.findOneAndDelete(filter).exec();
}
