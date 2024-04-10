import { UpdateStoreInput } from '../schemas';
import { IStore } from '../models/store.model';
import Store from '../models/store.model';

export function createStore(store: IStore) {
    return Store.create(store);
}

export function getStores(filter = {}) {
    return Store.find(filter).sort({ createdAt: 'desc' }).exec();
}

export function findStore(filter = {}, projection = '') {
    return Store.find(filter).select(projection).exec();
}

export function findStoreByFilterAndUpdate(filter = {}, input: Partial<UpdateStoreInput>, projection = '') {
    return Store.findOneAndUpdate(filter, input, { new: true }).select(projection).exec();
}
export function findStoreByFilterAndDelete(filter = {}) {
    return Store.findOneAndDelete(filter).exec();
}

export function findStoreByName(name: string, projection = '') {
    return Store.findOne({ name: name }).select(projection).exec();
}
