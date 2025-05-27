import {Request, Response, Router, NextFunction } from "express";
import EmployeeService from "../services/empoyee.service";
import HttpException from "../exception/httpException";
import { isEmail } from "../validators/emailValidator";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { CreateEmployeeDto } from "../dto/create-employee.dto";
import { UpdateEmployeeDto } from "../dto/update-employee.dto";
import { checkRole } from "../middlewares/authorization.middleware";

class EmployeeController {
    constructor (private employeeService: EmployeeService, router: Router) {
        router.post("/", checkRole(["HR"]), this.createEmployee.bind(this));
        router.get("/", this.getAllEmployees.bind(this));
        router.get("/:id", this.getEmployeeById.bind(this));
        router.put("/:id", this.updateEmployee);
        router.delete("/:id", this.deleteEmployee);
    }
    
    async createEmployee(req: Request, res: Response, next:NextFunction) {
        try {
            const createEmployeeDto = plainToInstance(CreateEmployeeDto, req.body);
            const errors = await validate(createEmployeeDto);
            if (errors.length > 0) {
                console.log(JSON.stringify(errors));
                throw new HttpException(400, errors as unknown as string);
            }
            const savedEmployee = await this.employeeService.createEmployee(
                createEmployeeDto
            );
            res.status(201).send(savedEmployee);
            } catch (error) {
            next(error);
            }
    }

    async getAllEmployees(req:Request, res:Response, next: NextFunction) {
        try {
            const employees = await this.employeeService.getAllEmployees();
            res.status(200).send(employees);
        } catch (err) {
            next(err);
        }
    }

    async getEmployeeById(req: Request, res: Response, next: NextFunction) {
        try {
            const id = Number(req.params.id);
            const employee = await this.employeeService.getEmployeeById(id);
            if (!employee) {
                throw new HttpException(404, "employee not found");
            }
            res.status(200).send(employee);
        } catch (err) {
            console.log(err);
            next(err);
        }

    }

    updateEmployee = async (req: Request, res: Response, next:NextFunction) => {
        try {
            const id = Number(req.params.id);

            const updateEmployeeDto = plainToInstance(UpdateEmployeeDto, req.body);
            const errors = await validate(updateEmployeeDto);
            if (errors.length > 0) {
                console.log(JSON.stringify(errors));
                throw new HttpException(400, errors as unknown as string);
            }
            const savedEmployee = await this.employeeService.updateEmployee(
                id,
                updateEmployeeDto
            );
            res.status(200).send();
        } catch (err) {
            console.log(err);
            next(err);
        }
        
    }

    deleteEmployee = async (req: Request, res: Response, next: NextFunction) => {
        try{
            const id = Number(req.params.id);
            await this.employeeService.deleteEmployee(id);
            res.status(200).send()
        } catch (err) {
            next(err);
        }
        
    }
}

export default EmployeeController;