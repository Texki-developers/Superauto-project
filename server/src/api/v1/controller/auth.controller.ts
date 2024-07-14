import { Request, Response } from 'express';
import { responseHandler } from '../../../utils/responseHandler/responseHandler';
import bcrypt from 'bcrypt';
import authService from '../services/auth.service';
import messages from '../../../utils/constants/messages';

class AuthController {
  async userRegister(req: Request, res: Response) {
    const { userName, password, email } = req.body;
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      await authService.createUser({ username: userName, password: hashedPassword, email: email });
      responseHandler(res, 'CREATED', { message: `user ${userName} created successfully` });
    } catch (error: any) {
      console.log(error);
      responseHandler(res, 'INTERNAL_SERVER_ERROR');
    }
  }
}

export default new AuthController();
