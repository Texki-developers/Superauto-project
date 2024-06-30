import jwt from 'jsonwebtoken';

export const generateJWT = async (body: any, expire: string) => {
  const jwtSecret: string = process.env.JWT_SECRET || '';
  const token = await jwt.sign(body, jwtSecret, { expiresIn: expire })
  return token;
}