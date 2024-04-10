import express from 'express';

import { Schemas } from '../schemas';
import { orderControllers } from '../controllers/order.controller';
import { jwtAuth } from '../authentication/passportjs/strategies/loader';
import { validateSchema } from '../middlewares';

const router = express.Router({ mergeParams: true });

router.get('/', orderControllers.readAllOrdersHandler);
router.get('/:orderId', validateSchema(Schemas.order.read), orderControllers.readOrderHandler);
router.post('/', validateSchema(Schemas.order.create), orderControllers.createOrderHandler);
router.delete('/:orderId', jwtAuth(), validateSchema(Schemas.order.delete), orderControllers.deleteOrderHandler);

// paypal payment routes
router.post('/checkout', orderControllers.checkoutOrderHandler);
router.post('/capture', orderControllers.captureOrderHandler);
export default router;
