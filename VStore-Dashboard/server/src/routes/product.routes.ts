import express from 'express';

import { Schemas } from '../schemas';
import { productControllers } from '../controllers/product.controller';
import { jwtAuth } from '../authentication/passportjs/strategies/loader';
import { validateSchema } from '../middlewares';

const router = express.Router({ mergeParams: true });

router.get('/', productControllers.readAllProductsHandler);
router.get('/:productId', validateSchema(Schemas.product.read), productControllers.readProductHandler);
router.post('/', jwtAuth(), validateSchema(Schemas.product.create), productControllers.createProductHandler);
router.patch('/:productId', jwtAuth(), validateSchema(Schemas.product.update), productControllers.updateProductHandler);
router.delete('/:productId', jwtAuth(), validateSchema(Schemas.product.delete), productControllers.deleteProductHandler);

export default router;
