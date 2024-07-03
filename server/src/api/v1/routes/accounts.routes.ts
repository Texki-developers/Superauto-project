import express, { Router } from 'express';
import accountsController from '../controller/accounts.controller';

const router: Router = express.Router();

router.post('/create/account', accountsController.createAccount);
router.post('/book/other-expense',accountsController.bookOtherExpense)

export default router;
