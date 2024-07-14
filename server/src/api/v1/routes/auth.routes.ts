import express from 'express';
import authController from '../controller/auth.controller';
import passport from 'passport';

const router = express.Router();

router.post('/register', authController.userRegister);
router.post('/login', authController.userLogin);
router.get('/logout', authController.logoutUser);
router.get('/checkuser', authController.checkUser);

export default router;
