import { Request, Response } from 'express';
import { responseHandler } from "../../../utils/responseHandler/responseHandler";
import authService from "../services/auth.service";


class authController {
    createAccountController = (req: Request, res: Response)=>{
        const body = req.body
        authService.loginService(body).then((data:any)=>{
            responseHandler(res, 'CREATED' , { message: data.message }) 
        }).catch(error => {
            responseHandler(res, 'INTERNAL_SERVER_ERROR', null, error)
          })
    }
}

export default new authController();
