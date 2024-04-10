import express from 'express';

import { Schemas } from '../schemas';
import { sizeControllers } from '../controllers/size.controller';
import { jwtAuth } from '../authentication/passportjs/strategies/loader';
import { validateSchema } from '../middlewares';

const router = express.Router({ mergeParams: true });

router.get('/', sizeControllers.readAllSizesHandler);
router.get('/:sizeId', validateSchema(Schemas.size.read), sizeControllers.readSizeHandler);
router.post('/', jwtAuth(), validateSchema(Schemas.size.create), sizeControllers.createSizeHandler);
router.patch('/:sizeId', jwtAuth(), validateSchema(Schemas.size.update), sizeControllers.updateSizeHandler);
router.delete('/:sizeId', jwtAuth(), validateSchema(Schemas.size.delete), sizeControllers.deleteSizeHandler);

export default router;
