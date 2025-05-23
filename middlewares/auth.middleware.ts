import {Request, Response, NextFunction} from 'express';
import HttpException from   '../exception/httpException';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../utils/constants';
import { JwtPayload } from "../dto/jwt-payload";

declare global {
    namespace Express {
        interface Request {
            user?: JwtPayload
        }
    }
}

const getToken = ( req: Request ): string => {
    const token: string|undefined = req.headers.authorization;
    if(!token)
        throw new HttpException(401, 'Not authorized')
    const tokenSplits = token.split(' ')
    if (tokenSplits.length != 2)
        throw new HttpException(401, "Invalid token")
    return tokenSplits[1]
}

export const authMiddleware = ( req:Request, res:Response, next: NextFunction ) => {
    const token = getToken(req);
    if (!token)
        throw new HttpException(401, "Not authorized")
    try {
        const payload = jwt.verify(token, JWT_SECRET) as JwtPayload;
        req.user = payload;
    } catch {
        throw new HttpException(401, "Invalid or expired token");
    }
    next();
} 