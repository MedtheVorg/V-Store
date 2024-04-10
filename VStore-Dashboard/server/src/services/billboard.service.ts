import { UpdateBillboardInput } from '../schemas';
import { IBillboard } from '../models/billboard.model';
import Billboard from '../models/billboard.model';

export function createBillboard(billboard: IBillboard) {
    return Billboard.create(billboard);
}

export function getBillboards(filter = {}) {
    return Billboard.find(filter).sort({ createdAt: 'descending' }).exec();
}

export function findBillboard(filter = {}, projection = '') {
    return Billboard.find(filter).select(projection).exec();
}

export function findBillboardByFilterAndUpdate(filter = {}, input: Partial<UpdateBillboardInput>, projection = '') {
    return Billboard.findOneAndUpdate(filter, input, { new: true }).select(projection).exec();
}
export function findBillboardByFilterAndDelete(filter = {}) {
    return Billboard.findOneAndDelete(filter).exec();
}
