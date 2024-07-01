import { Request, Response } from 'express';
import { responseHandler } from '../../../utils/responseHandler/responseHandler';
import AccountService from '../services/accounts.service';
import { IAccountBody, IOtherExpenseBody } from '../../../types/request.type';

class AccountController {
  createAccount = (req: Request, res: Response) => {
    const { body } = req;
    
    const data:IAccountBody = {
      name: body.name,
      category: body.category,
      salary: body?.salary,
      contact_info: body.contactInfo,
    };

    AccountService
      .createAccount(data)
      .then((data: any) => {
        responseHandler(res, 'CREATED', { message: data.message });
      })
      .catch((error) => {
        responseHandler(res, 'INTERNAL_SERVER_ERROR', null, error);
      });
  };

  
  bookOtherExpense = (req: Request, res: Response) => {
    const {body} = req;

    const data:IOtherExpenseBody = {
      expense_to: body?.expenseTo,
      description: body?.description,
      date: body?.date,
      amount: body?.amount
    }


  }

}

export default new AccountController();
