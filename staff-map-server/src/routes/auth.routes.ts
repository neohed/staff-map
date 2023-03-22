import express from 'express'
const router = express.Router();
import * as authController from '../controllers/auth.controllers'

router.post('/register', authController.postRegister);
router.post('/login', authController.postLogin);
router.get('/verifyToken', authController.getVerifyToken);

export default router;
