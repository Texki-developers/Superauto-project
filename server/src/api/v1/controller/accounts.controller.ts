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
   
    let { page, perPage } = req.query;
    const pageNum = page ? parseInt(page as string, 10) : 1;
    const perPageNum = perPage ? parseInt(perPage as string, 10) : 10;
  
  
    accountsService.getbyCategory(category,pageNum,perPageNum)
      .then((response:any ) => {
        responseHandler(res, 'OK', response.accounts, {message: 'RETRIEVED',meta:response.meta})
      }).catch((error:any) => {
        console.log(error);
        responseHandler(res, 'INTERNAL_SERVER_ERROR')
      })
  }

  getFinancerDetails (req: Request, res: Response)  {
    const { id } = req.params;
    accountsService.getFinancerDetails(Number(id))
      .then((response:any ) => {
        responseHandler(res, 'OK', response, {message: 'RETRIEVED'})
      }).catch((error:any) => {
        console.log(error);
        responseHandler(res, 'INTERNAL_SERVER_ERROR')
      })
  }

  getCategorySearch (req: Request, res: Response)  {
    const { search } = req.query;
    const {category} = req.params
  const searchString: string = search as string;
  const categoryString: string = category as string;
    accountsService.getCategorySearch(searchString,categoryString)
      .then((response:any ) => {
        responseHandler(res, 'OK', response, {message: 'RETRIEVED'})
      }).catch((error:any) => {
        console.log(error);
        responseHandler(res, 'INTERNAL_SERVER_ERROR')
      })
  }

  getDropDownCategory(req: Request, res: Response)  {
  
    const {category} = req.params
    accountsService.getDropDownCategoryList(category)
      .then((response:any ) => {
        responseHandler(res, 'OK', response.accounts, {message: 'RETRIEVED'})
      }).catch((error:any) => {
        console.log(error);
        responseHandler(res, 'INTERNAL_SERVER_ERROR')
      })
  }

}

export default new AccountController();
