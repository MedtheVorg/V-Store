import express from 'express';

import { Schemas } from '../schemas';
import { categoryControllers } from '../controllers/category.controller';
import { jwtAuth } from '../authentication/passportjs/strategies/loader';
import { validateSchema } from '../middlewares';

const router = express.Router({ mergeParams: true });

router.get('/', categoryControllers.readAllCategoriesHandler);
router.get('/:categoryId', validateSchema(Schemas.category.read), categoryControllers.readCategoryHandler);
router.post('/', jwtAuth(), validateSchema(Schemas.category.create), categoryControllers.createCategoryHandler);
router.patch('/:categoryId', jwtAuth(), validateSchema(Schemas.category.update), categoryControllers.updateCategoryHandler);
router.delete('/:categoryId', jwtAuth(), validateSchema(Schemas.category.delete), categoryControllers.deleteCategoryHandler);

export default router;
