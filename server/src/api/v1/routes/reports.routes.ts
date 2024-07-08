import express, { Router } from 'express';
import reportsController from '../controller/reports.controller';



const router: Router = express.Router();

router.get('/daily-report', reportsController.dailyBook);
router.get('/ledger-report', reportsController.ledgerReport);
router.get('/cashbook', reportsController.cashbookReport);
router.get('/trial-balance', reportsController.TrialBalanceReport);
router.get('/balance-sheet', reportsController.balanceSheetReport);
router.get('/list/dailybook-voucher', reportsController.listdailyBookVoucher);
router.get('/list/ledgers', reportsController.listLedgers);
router.get('/list/profit-loss', reportsController.profitAndLoss);
export default router;
