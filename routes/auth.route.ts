import { AuthController } from "../controllers/auth.controller";
import { AuthService } from "../services/auth.service";
import {Router} from 'express';
import { employeeService } from "./employee.route";

const authRouter = Router();
const authService = new AuthService(employeeService);
new AuthController(authService, authRouter);

export default authRouter;