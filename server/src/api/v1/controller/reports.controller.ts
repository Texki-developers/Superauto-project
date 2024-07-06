import { responseHandler } from "../../../utils/responseHandler/responseHandler";
import reportsService from "../services/reports.service";
import { Request, Response } from 'express';

class ReportsController {


    dailyBook(req: Request, res: Response) {     
        reportsService.dailybookReport()
          .then((data: any) => {
            responseHandler(res, 'OK', data, { message: data.message });
          })
          .catch((error) => {
            responseHandler(res, 'INTERNAL_SERVER_ERROR', null, error);
          });
      }
}


export default new ReportsController()