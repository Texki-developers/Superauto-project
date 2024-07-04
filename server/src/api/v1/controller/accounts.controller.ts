import { Request, Response } from 'express';
import { responseHandler } from '../../../utils/responseHandler/responseHandler';
import AccountService from '../services/accounts.service';
import { IAccountBody, IOtherExpenseBody, IPaymentBody, IRecieptBody } from '../../../types/request.type';
import accountsService from '../services/accounts.service';

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
      amount: body?.amount,
    }

    accountsService.bookOtherExpense(data)
      .then((response:any ) => {
        responseHandler(res, 'CREATED', null, {message: response})
      }).catch((error:any) => {
        responseHandler(res, 'INTERNAL_SERVER_ERROR')
      })
  }

  addReciept = (req: Request, res: Response) => {
    const {body} = req;

    const data:IRecieptBody = {
      payment_from: body?.paymentFrom,
      payment_to: body?.paymentTo,
      description: body?.description,
      date: body?.date,
      amount: body?.amount,
    }

    accountsService.addReciept(data)
      .then((response:any ) => {
        responseHandler(res, 'CREATED', null, {message: response})
      }).catch((error:any) => {
        responseHandler(res, 'INTERNAL_SERVER_ERROR')
      })
  }

  addPayment (req: Request, res: Response)  {
    const {body} = req;

    const data:IPaymentBody = {
      payment_from: body?.paymentFrom,
      payment_to: body?.paymentTo,
      description: body?.description,
      date: body?.date,
      amount: body?.amount,
    }

    accountsService.addPayment(data)
      .then((response:any ) => {
        responseHandler(res, 'CREATED', null, {message: response})
      }).catch((error:any) => {
        console.log(error);
        responseHandler(res, 'INTERNAL_SERVER_ERROR')
      })
  }

  getbyCategory (req: Request, res: Response)  {
    const { category } = req.params;
    if (typeof category !== 'string' || category.trim() === '') {
      res.status(400).json({ error: 'Invalid category' });
      return;
    }
    accountsService.getbyCategory(category)
      .then((response:any ) => {
        responseHandler(res, 'OK', response, {message: 'RETRIEVED'})
      }).catch((error:any) => {
        console.log(error);
        responseHandler(res, 'INTERNAL_SERVER_ERROR')
      })
  }

}

export default new AccountController();
