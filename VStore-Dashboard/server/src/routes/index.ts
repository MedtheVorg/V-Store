import userRouter from './user.routes';
import authRouter from './auth.routes';
import storeRouter from './store.routes';
import billboardRouter from './billboard.routes';
import categoryRouter from './category.routes';
import sizeRouter from './size.routes';
import colorRouter from './color.routes';
import productRouter from './product.routes';
import orderRouter from './order.routes';

import express from 'express';
import { Schemas } from '../schemas';
import { validateSchema } from '../middlewares';

const router = express.Router();

router.get('/healthcheck', (_req, res, next) => res.status(200).json({ server: 'is Running.' }));
router.use('/auth', authRouter);
router.use('/users', userRouter);
router.use('/stores', storeRouter);

router.use('/:storeId/billboards', validateSchema(Schemas.store.storeId), billboardRouter);
router.use('/:storeId/categories', validateSchema(Schemas.store.storeId), categoryRouter);
router.use('/:storeId/sizes', validateSchema(Schemas.store.storeId), sizeRouter);
router.use('/:storeId/colors', validateSchema(Schemas.store.storeId), colorRouter);
router.use('/:storeId/products', validateSchema(Schemas.store.storeId), productRouter);
router.use('/:storeId/orders', validateSchema(Schemas.store.storeId), orderRouter);

export default router;
