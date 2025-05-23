import { NextFunction, Request, Response } from "express";
import HttpException from "../exception/httpException";

// export const authorizationMiddleware = (req: Request, res: Response, next: NextFunction) => {
//     const role = req.user.role
//     if(role !== EmployeeRole.HR) {
//         throw new HttpException(403, "User has no access to the resource");
//     }
//     next();
// }

export const checkRole = (reqRole: string[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const role = req.user.role
        if(!reqRole.includes(role)) {
            throw new HttpException(403, "User has no access to the resource");
        }
        next();
    }
}