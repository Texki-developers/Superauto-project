import { responseHandler } from '../../../utils/responseHandler/responseHandler';
import reportsService from '../services/reports.service';
import { Request, Response } from 'express';

class ReportsController {
  dailyBook(req: Request, res: Response) {
    const {fromDate, toDate } = req.query;

    const fromDateStr = typeof fromDate === 'string' ? fromDate : '';
    const toDateStr = typeof toDate === 'string' ? toDate : '';
    reportsService
      .dailybookReport( fromDateStr, toDateStr)
      .then((data: any) => {
        responseHandler(res, 'OK', data, { message: data.message });
      })
      .catch((error) => {
        responseHandler(res, 'INTERNAL_SERVER_ERROR', null, error);
      });
  }

  listdailyBookVoucher(req: Request, res: Response) {
    reportsService
      .listdailyBookVoucher()
      .then((data: any) => {
        responseHandler(res, 'OK', data, { message: data.message });
      })
      .catch((error) => {
        responseHandler(res, 'INTERNAL_SERVER_ERROR', null, error);
      });
  }

  listLedgers(req: Request, res: Response) {
    reportsService
      .listLedgers()
      .then((data: any) => {
        responseHandler(res, 'OK', data, { message: data.message });
      })
      .catch((error) => {
        responseHandler(res, 'INTERNAL_SERVER_ERROR', null, error);
      });
  }

  ledgerReport(req: Request, res: Response) {
    const { ledger, fromDate, toDate } = req.query;

    const ledgerStr = typeof ledger === 'string' ? ledger : '';
    const fromDateStr = typeof fromDate === 'string' ? fromDate : '';
    const toDateStr = typeof toDate === 'string' ? toDate : '';
    reportsService
      .ledgerReport(Number(ledgerStr), fromDateStr, toDateStr)
      .then((data: any) => {
        responseHandler(res, 'OK', data, { message: data.message });
      })
      .catch((error) => {
        responseHandler(res, 'INTERNAL_SERVER_ERROR', null, error);
      });
  }

  cashbookReport(req: Request, res: Response) {
    const { fromDate, toDate } = req.query;

    const fromDateStr = typeof fromDate === 'string' ? fromDate : '';
    const toDateStr = typeof toDate === 'string' ? toDate : '';
    reportsService
      .cashbookReport(fromDateStr, toDateStr)
      .then((data: any) => {
        responseHandler(res, 'OK', data, { message: data.message });
      })
      .catch((error) => {
        responseHandler(res, 'INTERNAL_SERVER_ERROR', null, error);
      });
  }

  TrialBalanceReport(req: Request, res: Response) {
    const { fromDate, toDate } = req.query;

    const fromDateStr = typeof fromDate === 'string' ? fromDate : '';
    const toDateStr = typeof toDate === 'string' ? toDate : '';
    reportsService
      .trialBalanceReport(fromDateStr, toDateStr)
      .then((data: any) => {
        responseHandler(res, 'OK', data, { message: data.message });
      })
      .catch((error) => {
        responseHandler(res, 'INTERNAL_SERVER_ERROR', null, error);
      });
  }

  balanceSheetReport(req: Request, res: Response) {
    const { fromDate, toDate } = req.query;
    const fromDateStr = typeof fromDate === 'string' ? fromDate : '';
    const toDateStr = typeof toDate === 'string' ? toDate : '';
    reportsService
      .balanceSheetReport(fromDateStr,toDateStr)
      .then((data: any) => {
        responseHandler(res, 'OK', data, { message: data.message });
      })
      .catch((error) => {
        responseHandler(res, 'INTERNAL_SERVER_ERROR', null, error);
      });
  }


  profitAndLoss(req: Request, res: Response) {
    const { fromDate, toDate } = req.query;
    const fromDateStr = typeof fromDate === 'string' ? fromDate : '';
    const toDateStr = typeof toDate === 'string' ? toDate : '';
    reportsService
      .profitAndLoss(fromDateStr,toDateStr)
      .then((data: any) => {
        responseHandler(res, 'OK', data, { message: data.message });
      })
      .catch((error) => {
        responseHandler(res, 'INTERNAL_SERVER_ERROR', null, error);
      });
  }

  salesReport(req: Request, res: Response) {
    const { fromDate, toDate } = req.query;
    const fromDateStr = typeof fromDate === 'string' ? fromDate : '';
    const toDateStr = typeof toDate === 'string' ? toDate : '';

    reportsService
      .saleReport(fromDateStr,toDateStr)
      .then((data: any) => {
        responseHandler(res, 'OK', data, { message: data.message });
      })
      .catch((error) => {
        responseHandler(res, 'INTERNAL_SERVER_ERROR', null, error);
      });
  }
}

export default new ReportsController();
