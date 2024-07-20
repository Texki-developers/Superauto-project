import express, { Router } from 'express';
import accountsController from '../controller/accounts.controller';

const router: Router = express.Router();

router.post('/create/account', accountsController.createAccount);
router.delete('/delete/account', accountsController.deleteAccount);
router.post('/book/other-expense',accountsController.bookOtherExpense)
router.post('/book/payment',accountsController.addPayment)
router.post('/book/reciept',accountsController.addReciept)
router.get('/list/category/:category',accountsController.getbyCategory)
router.get('/list/financer/:id',accountsController.getFinancerDetails)
router.get('/list/category-drop/:category',accountsController.getDropDownCategory)
router.get('/list/getAllAccounts',accountsController.getAllAccounts)

export default router;
