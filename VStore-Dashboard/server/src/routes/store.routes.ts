import express from 'express';

import { Schemas } from '../schemas';
import { storeControllers } from '../controllers/store.controller';
import { jwtAuth } from '../authentication/passportjs/strategies/loader';
import { validateSchema } from '../middlewares';

const router = express.Router();

router.get('/', validateSchema(Schemas.store.readAll), storeControllers.readAllStoresHandler);
router.get('/:storeId', validateSchema(Schemas.store.read), storeControllers.readStoreHandler);
router.post('/', jwtAuth(), validateSchema(Schemas.store.create), storeControllers.createStoreHandler);
router.patch('/:storeId', jwtAuth(), validateSchema(Schemas.store.update), storeControllers.updateStoreHandler);
router.delete('/:storeId', jwtAuth(), validateSchema(Schemas.store.delete), storeControllers.deleteStoreHandler);

export default router;
