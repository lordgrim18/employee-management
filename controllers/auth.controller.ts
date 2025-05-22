import HttpException from "../exception/httpException";
import { AuthService } from "../services/auth.service";
import {Router, Request, Response, NextFunction } from 'express';

export class AuthController {
    constructor(
        private authService: AuthService,
        private router: Router
    ) {
        router.post("/login", this.login.bind(this))
    }

    async login(req: Request, res: Response, next: NextFunction) {
        try {
            const { email, password } = req.body
            if(!email || !password) {
                throw new HttpException(400, "Email or password not found")
            }
            const data = await this.authService.login(email, password);
            res.status(200).send(data);
        } catch (err) {
            next(err)
        }
    }
}