import { UpdateOrderInput } from '../schemas';
import { IOrder } from '../models/order.model';
import Order from '../models/order.model';

export function createAndSaveOrderToDatabase(order: IOrder) {
    return Order.create(order);
}

export function getOrders(filter = {}) {
    return Order.find(filter).populate('orderItems').sort({ createdAt: 'desc' }).exec();
}

export function findOrder(filter = {}, projection = '') {
    return Order.find(filter).select(projection).populate({ path: 'orderItems' }).exec();
}

export function findOrderByFilterAndUpdate(filter = {}, input: Partial<UpdateOrderInput>, projection = '') {
    return Order.findOneAndUpdate(filter, input, { new: true }).select(projection).exec();
}
export function findOrderByFilterAndDelete(filter = {}) {
    return Order.findOneAndDelete(filter).exec();
}
