import asyncHandler from 'express-async-handler';
import { Request, Response, NextFunction } from 'express';

import { CreateColorInput, UpdateColorInput, ColorParams, StoreParams } from '../schemas';
import { throwError } from '../utils/customError';
import { HttpCode } from '../utils/customError';
import { createColor, findColor, findColorByFilterAndDelete, findColorByFilterAndUpdate, getColors } from '../services/color.service';
import { toObjectId } from '../utils/helper-functions';

const readAllColorsHandler = asyncHandler(async (req: Request<StoreParams>, res: Response, next: NextFunction) => {
    const params = req.params;
    const colors = await getColors({ storeId: params.storeId });
    res.status(HttpCode.OK).json(colors);
});

const readColorHandler = asyncHandler(async (req: Request<ColorParams & StoreParams>, res: Response, next: NextFunction) => {
    const params = req.params;

    const color = await findColor({ _id: params.colorId, storeId: params.storeId });

    if (color.length === 0) {
        return throwError(HttpCode.NOT_FOUND, 'Color not found');
    }

    res.status(HttpCode.OK).json(color[0]);
});

const createColorHandler = asyncHandler(async (req: Request<StoreParams, {}, CreateColorInput>, res: Response, next: NextFunction) => {
    const body = req.body;
    const params = req.params;

    const color = await createColor({ ...body, storeId: toObjectId(params.storeId) });
    res.status(201).json(color);
});

const updateColorHandler = asyncHandler(async (req: Request<ColorParams & StoreParams, {}, UpdateColorInput>, res: Response, next: NextFunction) => {
    const body = req.body;
    const params = req.params;

    const color = await findColorByFilterAndUpdate({ _id: params.colorId, storeId: params.storeId }, { name: body.name, value: body.value });

    if (!color) {
        return throwError(HttpCode.NOT_FOUND, 'Color not found');
    }

    res.status(HttpCode.OK).json(color);
});
const deleteColorHandler = asyncHandler(async (req: Request<ColorParams & StoreParams>, res: Response, next: NextFunction) => {
    const params = req.params;

    const color = await findColorByFilterAndDelete({ _id: params.colorId, storeId: params.storeId });

    if (!color) {
        return throwError(HttpCode.NOT_FOUND, 'Color not found.');
    }
    res.status(HttpCode.OK).json({ message: 'Color deleted.' });
});

export const colorControllers = {
    readAllColorsHandler,
    readColorHandler,
    createColorHandler,
    updateColorHandler,
    deleteColorHandler
};
