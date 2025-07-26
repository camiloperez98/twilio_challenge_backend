import {Router} from 'express';
import * as userController from '../controllers/auth.controller.js';

const router = Router();

router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);

export default router;
