import { NextFunction, Request, Response } from 'express';
import { responseHandler } from '../../../utils/responseHandler/responseHandler';
import bcrypt from 'bcrypt';
import authService from '../services/auth.service';
import passport from 'passport';

class AuthController {
  async userRegister(req: Request, res: Response) {
    const { userName, password, email } = req.body;
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      await authService.createUser({ username: userName, password: hashedPassword, email: email });
      return responseHandler(res, 'CREATED', { message: `user ${userName} created successfully` });
    } catch (error: any) {
      console.log(error);
      return responseHandler(res, 'INTERNAL_SERVER_ERROR');
    }
  }
  async logoutUser(req: Request, res: Response, next: NextFunction) {
    try {
      req.logout((err) => {
        if (err) {
          return next(err);
        }
        return responseHandler(res, 'OK', { message: `Successfully logged out!` });
      });
    } catch (error: any) {
      console.log(error);
      return responseHandler(res, 'INTERNAL_SERVER_ERROR');
    }
  }
  async checkUser(req: Request, res: Response, next: NextFunction) {
    try {
      if (req?.isAuthenticated()) {
        return responseHandler(res, 'OK', { message: 'User is authenticated!' });
      }
      return responseHandler(res, 'INTERNAL_SERVER_ERROR', { message: 'User is not authenticated!' });
    } catch (error: any) {
      console.log(error);
      return responseHandler(res, 'INTERNAL_SERVER_ERROR');
    }
  }

  async userLogin(req: Request, res: Response) {
    passport.authenticate('local', (err: any, user: any, info: any) => {
      if (err) {
        return responseHandler(res, 'INTERNAL_SERVER_ERROR', { message: 'An error occurred during login.' });
      }
      if (!user) {
        console.log('no user is logged in................');
        return responseHandler(res, 'INTERNAL_SERVER_ERROR', { message: 'Authentication failed. ' });
      }
      req.logIn(user, (err) => {
        if (err) {
          return responseHandler(res, 'INTERNAL_SERVER_ERROR', { message: 'An error occurred during login.' });
        }
        return responseHandler(res, 'OK', { message: 'Login successful', user: user.user_name });
      });
    })(req, res);
  }
}

export default new AuthController();
