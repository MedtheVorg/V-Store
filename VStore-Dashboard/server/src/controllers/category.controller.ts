import asyncHandler from 'express-async-handler';
import { Request, Response, NextFunction } from 'express';

import { CreateCategoryInput, UpdateCategoryInput, CategoryParams, StoreParams } from '../schemas';
import { throwError } from '../utils/customError';
import { HttpCode } from '../utils/customError';
import {
    createCategory,
    findCategory,
    findCategoryByFilterAndDelete,
    findCategoryByFilterAndUpdate,
    getCategories
} from '../services/category.service';
import { toObjectId } from '../utils/helper-functions';

const readAllCategoriesHandler = asyncHandler(async (req: Request<StoreParams>, res: Response, next: NextFunction) => {
    const params = req.params;
    const categories = await getCategories({ storeId: params.storeId });
    res.status(HttpCode.OK).json(categories);
});

const readCategoryHandler = asyncHandler(async (req: Request<CategoryParams & StoreParams>, res: Response, next: NextFunction) => {
    const params = req.params;

    const category = await findCategory({ _id: params.categoryId, storeId: params.storeId });

    if (category.length === 0) {
        return throwError(HttpCode.NOT_FOUND, 'Category not found');
    }

    res.status(HttpCode.OK).json(category[0]);
});

const createCategoryHandler = asyncHandler(async (req: Request<StoreParams, {}, CreateCategoryInput>, res: Response, next: NextFunction) => {
    const body = req.body;
    const params = req.params;
    console.log('category id :', params.storeId);

    const category = await createCategory({ ...body, storeId: toObjectId(params.storeId), billboardId: toObjectId(body.billboardId) });
    res.status(201).json(category);
});

const updateCategoryHandler = asyncHandler(
    async (req: Request<CategoryParams & StoreParams, {}, UpdateCategoryInput>, res: Response, next: NextFunction) => {
        const body = req.body;
        const params = req.params;

        const category = await findCategoryByFilterAndUpdate(
            { _id: params.categoryId, storeId: params.storeId },
            { name: body.name, billboardId: body.billboardId }
        );

        if (!category) {
            return throwError(HttpCode.NOT_FOUND, 'Category not found');
        }

        res.status(HttpCode.OK).json(category);
    }
);
const deleteCategoryHandler = asyncHandler(async (req: Request<CategoryParams & StoreParams>, res: Response, next: NextFunction) => {
    const params = req.params;

    const category = await findCategoryByFilterAndDelete({ _id: params.categoryId, storeId: params.storeId });

    if (!category) {
        return throwError(HttpCode.NOT_FOUND, 'Category not found.');
    }
    res.status(HttpCode.OK).json({ message: 'Category deleted.' });
});

export const categoryControllers = {
    readAllCategoriesHandler,
    readCategoryHandler,
    createCategoryHandler,
    updateCategoryHandler,
    deleteCategoryHandler
};
