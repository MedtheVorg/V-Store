import express from 'express';

import { Schemas } from '../schemas';
import { billboardControllers } from '../controllers/billboard.controller';
import { jwtAuth } from '../authentication/passportjs/strategies/loader';
import { validateSchema } from '../middlewares';

const router = express.Router({ mergeParams: true });

router.get('/', billboardControllers.readAllBillboardsHandler);
router.get('/:billboardId', validateSchema(Schemas.billboard.read), billboardControllers.readBillboardHandler);
router.post('/', validateSchema(Schemas.billboard.create), billboardControllers.createBillboardHandler);
router.patch('/:billboardId', jwtAuth(), validateSchema(Schemas.billboard.update), billboardControllers.updateBillboardHandler);
router.delete('/:billboardId', jwtAuth(), validateSchema(Schemas.billboard.delete), billboardControllers.deleteBillboardHandler);

export default router;
