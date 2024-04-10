import asyncHandler from 'express-async-handler';
import { Request, Response, NextFunction } from 'express';

import { CreateSizeInput, UpdateSizeInput, SizeParams, StoreParams } from '../schemas';
import { throwError } from '../utils/customError';
import { HttpCode } from '../utils/customError';
import { createSize, findSize, findSizeByFilterAndDelete, findSizeByFilterAndUpdate, getSizes } from '../services/size.service';
import { toObjectId } from '../utils/helper-functions';

const readAllSizesHandler = asyncHandler(async (req: Request<StoreParams>, res: Response, next: NextFunction) => {
    const params = req.params;
    const sizes = await getSizes({ storeId: params.storeId });
    res.status(HttpCode.OK).json(sizes);
});

const readSizeHandler = asyncHandler(async (req: Request<SizeParams & StoreParams>, res: Response, next: NextFunction) => {
    const params = req.params;

    const size = await findSize({ _id: params.sizeId, storeId: params.storeId });

    if (size.length === 0) {
        return throwError(HttpCode.NOT_FOUND, 'Size not found');
    }

    res.status(HttpCode.OK).json(size[0]);
});

const createSizeHandler = asyncHandler(async (req: Request<StoreParams, {}, CreateSizeInput>, res: Response, next: NextFunction) => {
    const body = req.body;
    const params = req.params;

    const size = await createSize({ ...body, storeId: toObjectId(params.storeId) });
    res.status(201).json(size);
});

const updateSizeHandler = asyncHandler(async (req: Request<SizeParams & StoreParams, {}, UpdateSizeInput>, res: Response, next: NextFunction) => {
    const body = req.body;
    const params = req.params;

    const size = await findSizeByFilterAndUpdate({ _id: params.sizeId, storeId: params.storeId }, { name: body.name, value: body.value });

    if (!size) {
        return throwError(HttpCode.NOT_FOUND, 'Size not found');
    }

    res.status(HttpCode.OK).json(size);
});
const deleteSizeHandler = asyncHandler(async (req: Request<SizeParams & StoreParams>, res: Response, next: NextFunction) => {
    const params = req.params;

    const size = await findSizeByFilterAndDelete({ _id: params.sizeId, storeId: params.storeId });

    if (!size) {
        return throwError(HttpCode.NOT_FOUND, 'Size not found.');
    }
    res.status(HttpCode.OK).json({ message: 'size deleted.' });
});

export const sizeControllers = {
    readAllSizesHandler,
    readSizeHandler,
    createSizeHandler,
    updateSizeHandler,
    deleteSizeHandler
};
