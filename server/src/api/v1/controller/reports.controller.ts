import { responseHandler } from '../../../utils/responseHandler/responseHandler';
import reportsService from '../services/reports.service';
import { Request, Response } from 'express';

class ReportsController {
  dailyBook(req: Request, res: Response) {
    const { voucher, fromDate, toDate } = req.query;

    const voucherStr = typeof voucher === 'string' ? voucher : '';
    const fromDateStr = typeof fromDate === 'string' ? fromDate : '';
    const toDateStr = typeof toDate === 'string' ? toDate : '';
    reportsService
      .dailybookReport(voucherStr, fromDateStr, toDateStr)
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
      .ledgerReport(ledgerStr, fromDateStr, toDateStr)
      .then((data: any) => {
        responseHandler(res, 'OK', data, { message: data.message });
      })
      .catch((error) => {
        responseHandler(res, 'INTERNAL_SERVER_ERROR', null, error);
      });
  }
}

export default new ReportsController();
