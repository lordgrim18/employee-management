import {Request, Response, NextFunction} from 'express';
import HttpException from '../exception/httpException';

export const errorMiddleware = (
    error:Error,
    req: Request,
    res: Response,
    next: NextFunction 
) => {
    try {
        console.log(error);
        if (error instanceof HttpException) {
            const status: number = error.status || 500;
            const message: string = error.message || "Something went wrong";
            let respbody = { message: message};
            res.status(status).json(respbody);
        } else {
            console.error(error.stack);
            res.status(500).send({ error: error.message });
        }
    } catch (err) {
        next(err);
    }
}