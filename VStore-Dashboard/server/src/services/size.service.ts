import { UpdateSizeInput } from '../schemas';
import { ISize } from '../models/size.model';
import Size from '../models/size.model';

export function createSize(size: ISize) {
    return Size.create(size);
}

export function getSizes(filter = {}) {
    return Size.find(filter).sort({ createdAt: 'desc' }).exec();
}

export function findSize(filter = {}, projection = '') {
    return Size.find(filter).select(projection).exec();
}

export function findSizeByFilterAndUpdate(filter = {}, input: Partial<UpdateSizeInput>, projection = '') {
    return Size.findOneAndUpdate(filter, input, { new: true }).select(projection).exec();
}
export function findSizeByFilterAndDelete(filter = {}) {
    return Size.findOneAndDelete(filter).exec();
}
