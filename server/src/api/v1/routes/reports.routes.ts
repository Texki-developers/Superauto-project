import express, { Router } from 'express';
import reportsController from '../controller/reports.controller';



const router: Router = express.Router();

router.get('/daily-report', reportsController.dailyBook);


export default router;
