import express from 'express';

import { Schemas } from '../schemas';
import { userControllers } from '../controllers/user.controller';
import { jwtAuth } from '../authentication/passportjs/strategies/loader';
import { validateSchema } from '../middlewares';

const router = express.Router();

router.get('/', userControllers.readAllUsersHandler);
router.get('/:userId', validateSchema(Schemas.user.read), userControllers.readUserHandler);
router.post('/', validateSchema(Schemas.user.create), userControllers.createUserHandler);
router.patch('/:userId', jwtAuth(), validateSchema(Schemas.user.update), userControllers.updateUserHandler);
router.delete('/:userId', jwtAuth(), validateSchema(Schemas.user.delete), userControllers.deleteUserHandler);

export default router;
