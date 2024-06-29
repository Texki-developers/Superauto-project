import express, { Router } from 'express';
import authController from '../controller/auth.controller';

const router: Router = express.Router();

router.post('/create/account', authController.createAccount);

export default router;
