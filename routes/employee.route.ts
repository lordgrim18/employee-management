import express from 'express';
import datasource from '../db/data-source';
import EmployeeRepository from '../repositories/employee.repository';
import EmployeeService from '../services/empoyee.service';
import EmployeeController from "../controllers/employee.controller";
import Employee from '../entities/employee.entity';
import { departmentRepository } from './department.route';

const employeeRouter = express.Router();

const employeeRepository = new EmployeeRepository(datasource.getRepository(Employee));
const employeeService = new EmployeeService(employeeRepository, departmentRepository);
const employeeController = new EmployeeController(employeeService, employeeRouter);

export { employeeService };
export default employeeRouter;