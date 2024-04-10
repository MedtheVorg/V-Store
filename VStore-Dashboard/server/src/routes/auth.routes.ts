import { authControllers } from '../controllers/auth.controller';
import { validateSchema } from '../middlewares';
import { Schemas } from '../schemas';
import express from 'express';

const router = express.Router();

router.post('/', validateSchema(Schemas.user.signin), authControllers.signInUserHandler);
router.post('/logout', authControllers.logOutUserHandler);
router.get('/refreshToken', authControllers.refreshTokenHandler);

export default router;
