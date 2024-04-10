import { UpdateUserInput } from '../schemas';
import { IUser } from '../models/user.model';
import User from '../models/user.model';

export function createUser(user: IUser) {
    return User.create(user);
}

export function getUsers() {
    return User.find().sort({ createdAt: 'desc' }).exec();
}

export function findUserById(userId: string, projection = '') {
    return User.findById(userId).select(projection).exec();
}

export function findUserByIdAndUpdate(userId: string, input: any, projection = '') {
    return User.findByIdAndUpdate(userId, input, { new: true }).select(projection).exec();
}
export function findUserByIdAndDelete(userId: string) {
    return User.findByIdAndDelete(userId).exec();
}

export function findUserByEmail(email: string, projection = '') {
    return User.findOne({ email: email }).select(projection).exec();
}
