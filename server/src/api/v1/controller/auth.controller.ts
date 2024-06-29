import { Request, Response } from 'express';
import { responseHandler } from '../../../utils/responseHandler/responseHandler';
import authService from '../services/auth.service';

class authController {
  createAccount = (req: Request, res: Response) => {
    const { body } = req;
    
    const data = {
      name: body.name,
      category: body.category,
      salary: body?.salary,
      contact_info: body.name,
      head:'employee'
    };
    authService
      .loginService(data)
      .then((data: any) => {
        console.log(data,"data")
        responseHandler(res, 'CREATED', { message: data.message });
      })
      .catch((error) => {
        responseHandler(res, 'INTERNAL_SERVER_ERROR', null, error);
      });
  };
}

export default new authController();
