import asyncHandler from 'express-async-handler';
import { Request, Response, NextFunction } from 'express';

import { CreateProductInput, UpdateProductInput, ProductParams, StoreParams } from '../schemas';
import { throwError } from '../utils/customError';
import { HttpCode } from '../utils/customError';
import { createProduct, findProduct, findProductByFilterAndDelete, findProductByFilterAndUpdate, getProducts } from '../services/product.service';
import { toObjectId } from '../utils/helper-functions';

type SearchParams = {
    categoryId?: string;
    colorId?: string;
    sizeId?: string;
    isFeatured?: boolean;
};

const readAllProductsHandler = asyncHandler(async (req: Request<StoreParams, {}, {}, SearchParams>, res: Response, next: NextFunction) => {
    const params = req.params;
    const query = req.query;

    const category = query.categoryId || undefined;
    const color = query.colorId || undefined;
    const size = query.sizeId || undefined;
    const isFeatured = query.isFeatured ? true : undefined;

    const products = await getProducts({
        storeId: params.storeId,
        category,
        color,
        size,
        isFeatured
    });

    res.status(HttpCode.OK).json(products);
});

const readProductHandler = asyncHandler(async (req: Request<ProductParams & StoreParams>, res: Response, next: NextFunction) => {
    const params = req.params;

    const product = await findProduct({ _id: params.productId, storeId: params.storeId });

    if (product.length === 0) {
        return throwError(HttpCode.NOT_FOUND, 'Product not found');
    }

    res.status(HttpCode.OK).json(product[0]);
});

const createProductHandler = asyncHandler(async (req: Request<StoreParams, {}, CreateProductInput>, res: Response, next: NextFunction) => {
    const body = req.body;
    const params = req.params;

    const product = await createProduct({
        ...body,
        storeId: toObjectId(params.storeId),
        category: toObjectId(body.category),
        size: toObjectId(body.size),
        color: toObjectId(body.color)
    });

    res.status(201).json(product);
});

const updateProductHandler = asyncHandler(
    async (req: Request<ProductParams & StoreParams, {}, UpdateProductInput>, res: Response, next: NextFunction) => {
        const body = req.body;
        const params = req.params;

        const product = await findProductByFilterAndUpdate(
            { _id: params.productId, storeId: params.storeId },
            {
                name: body.name,
                price: body.price,
                images: body.images,
                category: body.category,
                size: body.size,
                color: body.color,
                isFeatured: body.isFeatured,
                isArchived: body.isArchived
            }
        );

        if (!product) {
            return throwError(HttpCode.NOT_FOUND, 'Product not found');
        }

        res.status(HttpCode.OK).json(product);
    }
);
const deleteProductHandler = asyncHandler(async (req: Request<ProductParams & StoreParams>, res: Response, next: NextFunction) => {
    const params = req.params;

    const product = await findProductByFilterAndDelete({ _id: params.productId, storeId: params.storeId });

    if (!product) {
        return throwError(HttpCode.NOT_FOUND, 'Product not found.');
    }
    res.status(HttpCode.OK).json({ message: 'product deleted.' });
});

export const productControllers = {
    readAllProductsHandler,
    readProductHandler,
    createProductHandler,
    updateProductHandler,
    deleteProductHandler
};
