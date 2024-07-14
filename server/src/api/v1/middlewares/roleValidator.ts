import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from 'jsonwebtoken';
import { responseHandler } from "../../../utils/responseHandler/responseHandler";

export const roleValidator = (roles: string[]) => async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization || '';

    const jwtSecret = process.env.JWT_SECRET || ''; // Replace with your JWT secret
    let decoded = await jwt.verify(token, jwtSecret) as JwtPayload;
   
    if (roles.includes(decoded.role)) {
      next();
    } else {
      return responseHandler(res, 'UNAUTHORIZED')
    }
  } catch (error: any) {
    return responseHandler(res, 'UNAUTHORIZED')
  }
}