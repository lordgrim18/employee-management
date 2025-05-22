import { NextFunction, Request, Response } from "express";
import { EmployeeRole } from "../entities/employee.entity";
import HttpException from "../exception/httpException";

export const authorizationMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const role = req.user.role
    if(role !== EmployeeRole.HR) {
        throw new HttpException(403, "User has no access to the resource");
    }
    next();
}