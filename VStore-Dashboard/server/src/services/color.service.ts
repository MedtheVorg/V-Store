import { UpdateColorInput } from '../schemas';
import { IColor } from '../models/color.model';
import Color from '../models/color.model';

export function createColor(color: IColor) {
    return Color.create(color);
}

export function getColors(filter = {}) {
    return Color.find(filter).sort({ createdAt: 'desc' }).exec();
}

export function findColor(filter = {}, projection = '') {
    return Color.find(filter).select(projection).exec();
}

export function findColorByFilterAndUpdate(filter = {}, input: Partial<UpdateColorInput>, projection = '') {
    return Color.findOneAndUpdate(filter, input, { new: true }).select(projection).exec();
}
export function findColorByFilterAndDelete(filter = {}) {
    return Color.findOneAndDelete(filter).exec();
}
