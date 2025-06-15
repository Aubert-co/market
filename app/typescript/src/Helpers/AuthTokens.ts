import jwt from 'jsonwebtoken'
import { ErrorMessage } from './ErrorMessage';

const ACCESS_TOKEN = process.env.ACCESS_TOKEN;
const REFRESH_TOKEN = process.env.REFRESH_TOKEN;

export const generateAccessToken = (userId: number) => {
  if (!ACCESS_TOKEN) throw new ErrorMessage("Access token secret is missing", 500);
  return jwt.sign({ id: userId }, ACCESS_TOKEN, { expiresIn: '15m' });
};

export const generateRefreshToken = (userId: number) => {
  if (!REFRESH_TOKEN) throw new ErrorMessage("Refresh token secret is missing", 500);
  return jwt.sign({ id: userId }, REFRESH_TOKEN, { expiresIn: '7d' });
};