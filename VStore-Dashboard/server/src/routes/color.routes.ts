import express from 'express';

import { Schemas } from '../schemas';
import { colorControllers } from '../controllers/color.controller';
import { jwtAuth } from '../authentication/passportjs/strategies/loader';
import { validateSchema } from '../middlewares';

const router = express.Router({ mergeParams: true });

router.get('/', colorControllers.readAllColorsHandler);
router.get('/:colorId', validateSchema(Schemas.color.read), colorControllers.readColorHandler);
router.post('/', jwtAuth(), validateSchema(Schemas.color.create), colorControllers.createColorHandler);
router.patch('/:colorId', jwtAuth(), validateSchema(Schemas.color.update), colorControllers.updateColorHandler);
router.delete('/:colorId', jwtAuth(), validateSchema(Schemas.color.delete), colorControllers.deleteColorHandler);

export default router;
