import asyncHandler from 'express-async-handler';
import { Request, Response, NextFunction } from 'express';

import { CreateStoreInput, UpdateStoreInput, StoreParams, ReadStoreInput, DeleteStoreInput, ReadAllStoresInput } from '../schemas';
import { throwError } from '../utils/customError';
import { HttpCode } from '../utils/customError';
import { createStore, findStore, findStoreByFilterAndDelete, findStoreByFilterAndUpdate, getStores } from '../services/store.service';
import { toObjectId } from '../utils/helper-functions';

const readAllStoresHandler = asyncHandler(async (req: Request<{}, {}, {}, ReadAllStoresInput>, res: Response, next: NextFunction) => {
    const query = req.query;
    const stores = await getStores({ userId: query.userId });
    res.status(200).json(stores);
});

const readStoreHandler = asyncHandler(async (req: Request<StoreParams, {}, {}, ReadStoreInput>, res: Response, next: NextFunction) => {
    const params = req.params;
    const query = req.query;

    const store = await findStore({ _id: params.storeId, userId: query.userId });

    if (store.length === 0) {
        return throwError(HttpCode.NOT_FOUND, 'Store not found');
    }

    res.status(200).json(store[0]);
});

const createStoreHandler = asyncHandler(async (req: Request<{}, {}, CreateStoreInput>, res: Response, next: NextFunction) => {
    const body = req.body;

    const store = await createStore({ ...body, userId: toObjectId(body.userId) });
    res.status(201).json(store);
});

const updateStoreHandler = asyncHandler(async (req: Request<StoreParams, {}, UpdateStoreInput>, res: Response, next: NextFunction) => {
    const body = req.body;
    const params = req.params;

    const store = await findStoreByFilterAndUpdate({ _id: params.storeId, userId: body.userId }, { name: body.name });

    if (!store) {
        return throwError(HttpCode.NOT_FOUND, 'Store not found');
    }

    res.status(200).json(store);
});
const deleteStoreHandler = asyncHandler(async (req: Request<StoreParams, {}, DeleteStoreInput>, res: Response, next: NextFunction) => {
    const params = req.params;
    const body = req.body;

    const store = await findStoreByFilterAndDelete({ _id: params.storeId, userId: body.userId });

    if (!store) {
        return throwError(HttpCode.NOT_FOUND, 'Store not found.');
    }
    res.status(200).json({ message: 'store deleted.' });
});

export const storeControllers = {
    readAllStoresHandler,
    readStoreHandler,
    createStoreHandler,
    updateStoreHandler,
    deleteStoreHandler
};
