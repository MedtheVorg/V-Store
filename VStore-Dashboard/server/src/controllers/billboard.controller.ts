import asyncHandler from 'express-async-handler';
import { Request, Response, NextFunction } from 'express';

import { CreateBillboardInput, UpdateBillboardInput, BillboardParams, StoreParams } from '../schemas';
import { throwError } from '../utils/customError';
import { HttpCode } from '../utils/customError';
import {
    createBillboard,
    findBillboard,
    findBillboardByFilterAndDelete,
    findBillboardByFilterAndUpdate,
    getBillboards
} from '../services/billboard.service';
import { toObjectId } from '../utils/helper-functions';

const readAllBillboardsHandler = asyncHandler(async (req: Request<StoreParams>, res: Response, next: NextFunction) => {
    const params = req.params;

    const billboards = await getBillboards({ storeId: params.storeId });
    res.status(HttpCode.OK).json(billboards);
});

const readBillboardHandler = asyncHandler(async (req: Request<BillboardParams & StoreParams>, res: Response, next: NextFunction) => {
    const params = req.params;

    const billboard = await findBillboard({ _id: params.billboardId, storeId: params.storeId });

    if (billboard.length === 0) {
        return throwError(HttpCode.NOT_FOUND, 'Billboard not found');
    }

    res.status(HttpCode.OK).json(billboard[0]);
});

const createBillboardHandler = asyncHandler(async (req: Request<StoreParams, {}, CreateBillboardInput>, res: Response, next: NextFunction) => {
    const body = req.body;
    const params = req.params;

    const billboard = await createBillboard({ ...body, storeId: toObjectId(params.storeId) });
    res.status(201).json(billboard);
});

const updateBillboardHandler = asyncHandler(
    async (req: Request<BillboardParams & StoreParams, {}, UpdateBillboardInput>, res: Response, next: NextFunction) => {
        const body = req.body;
        const params = req.params;

        const billboard = await findBillboardByFilterAndUpdate(
            { _id: params.billboardId, storeId: params.storeId },
            { label: body.label, imageUrl: body.imageUrl }
        );

        if (!billboard) {
            return throwError(HttpCode.NOT_FOUND, 'Billboard not found');
        }

        res.status(HttpCode.OK).json(billboard);
    }
);
const deleteBillboardHandler = asyncHandler(async (req: Request<BillboardParams & StoreParams>, res: Response, next: NextFunction) => {
    const params = req.params;

    const billboard = await findBillboardByFilterAndDelete({ _id: params.billboardId, storeId: params.storeId });

    if (!billboard) {
        return throwError(HttpCode.NOT_FOUND, 'Billboard not found.');
    }
    res.status(HttpCode.OK).json({ message: 'billboard deleted.' });
});

export const billboardControllers = {
    readAllBillboardsHandler,
    readBillboardHandler,
    createBillboardHandler,
    updateBillboardHandler,
    deleteBillboardHandler
};
