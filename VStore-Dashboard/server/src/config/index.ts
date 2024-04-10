import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config(); // load environment variables

export const DEVELOPMENT = process.env.NODE_ENV === 'development';
export const TEST = process.env.NODE_ENV === 'test';

export const MONGO_USER = process.env.MONGO_USER || '';
export const MONGO_PASSWORD = process.env.MONGO_PASSWORD || '';
export const MONGO_URL = process.env.MONGO_URL || '';
export const MONGO_DATABASE = process.env.MONGO_DATABASE || '';
export const MONGO_OPTIONS: mongoose.ConnectOptions = { retryWrites: true, writeConcern: { w: 'majority' } };

export const SERVER_HOSTNAME = process.env.SERVER_HOSTNAME || 'localhost';
export const SERVER_PORT = process.env.SERVER_PORT ? parseInt(process.env.SERVER_PORT) : 4500;

export const SESSION_SECRET = process.env.SESSION_SECRET || 'hpK8NWOEl3';

export const mongo = {
    MONGO_USER,
    MONGO_PASSWORD,
    MONGO_URL,
    MONGO_DATABASE,
    MONGO_OPTIONS,
    MONGO_CONNECTION: `mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_URL}/${MONGO_DATABASE}`
};

export const SERVER = {
    SERVER_HOSTNAME,
    SERVER_PORT
};
