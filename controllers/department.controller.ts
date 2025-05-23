import {Request, Response, Router, NextFunction } from "express";
import EmployeeService from "../services/empoyee.service";
import HttpException from "../exception/httpException";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import DepartmentService from "../services/department.service";
import { CreateDepartmentDto } from "../dto/create-department.dto";
import UpdateDepartmentDto from "../dto/update-department.dto";

class DepartmentController {
    constructor (private departmentService: DepartmentService, router: Router) {
        router.post("/", this.createDepartment.bind(this));
        router.get("/", this.getAllDepartments.bind(this));
        router.get("/:id", this.getDepartmentById.bind(this));
        router.put("/:id", this.updateDepartment.bind(this));
        router.delete("/:id", this.deleteDepartment.bind(this));
    }

    async createDepartment(req: Request, res: Response, next: NextFunction) {
        try{
            const createDepartmentDto = plainToInstance(CreateDepartmentDto, req.body);
            const errors = await validate(createDepartmentDto);
            if (errors.length > 0) {
                throw new HttpException(400, errors as unknown as string); 
            }
            const savedDepartment = await this.departmentService.createDepartment(
                createDepartmentDto.name
            );
            res.status(201).send(savedDepartment)
        } catch (err) {
            next(err);
        }
    }

    async getAllDepartments(req:Request, res: Response, next: NextFunction) {
        try {
            const departments = await this.departmentService.getAllDepartment();
            res.status(200).send(departments);
        } catch (err) {
            next(err);
        }
    }

    async getDepartmentById(req:Request, res:Response, next: NextFunction) {
        try {
            const id = Number(req.params.id);
            const department = await this.departmentService.getDepartmentById(id);
            if (!department) {
                throw new HttpException(404, "department not found");
            }
            res.status(200).send(department);
        } catch (err){
            next(err);
        }
    }

    async updateDepartment(req:Request, res:Response, next: NextFunction) {
        try {
            const id = Number(req.params.id);
            const updateDepartmentDto = plainToInstance(UpdateDepartmentDto, req.body);
            const errors = await validate(updateDepartmentDto);
            if (errors.length > 0) {
                throw new HttpException(400, "department not found")
            }
            await this.departmentService.updateDepartment(id, updateDepartmentDto);
            res.status(200).send()
        } catch (err) {
            next(err);
        }
    }

    async deleteDepartment(req: Request, res: Response, next: NextFunction) {
        try {
            const id = Number(req.params.id);
            await this.departmentService.deleteDepartment(id);
            res.status(200).send()
        } catch (err) {
            next(err);
        }
    }

}

export default DepartmentController;