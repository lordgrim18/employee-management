import UpdateAddressDto from "../dto/update-address.dto";
import Employee, { EmployeeRole } from "../entities/employee.entity";
import EmployeeRepository from "../repositories/employee.repository";
import { LoggerService } from "./logger.service";
import DepartmentRepository from "../repositories/department.repository";
import Department from "../entities/department.entity";
import UpdateDepartmentDto from "../dto/update-department.dto";
import HttpException from "../exception/httpException";

class DepartmentService {
    private logger: LoggerService;
    constructor(private departmentRepository: DepartmentRepository) {
        this.logger = LoggerService.getInstance(DepartmentService.name)
    }

    async createDepartment(name: string): Promise<Department> {
        const department = new Department();
        department.name = name;
        return this.departmentRepository.create(department);
    }

    async getAllDepartment(): Promise<Department[]> {
        return this.departmentRepository.findMany();
    }

    async getDepartmentById(id:number): Promise<Department> {
        return this.departmentRepository.findOneById(id);
    }

    async updateDepartment(id: number, department: UpdateDepartmentDto) {
        const existingDepartment = await this.departmentRepository.findOneById(id);
        if (!existingDepartment) {
            throw new HttpException(404, "Department not found");
        }
        const newDepartment = new Department();
        newDepartment.name = department.name;
        await this.departmentRepository.update(id, newDepartment);
    }

    async deleteDepartment(id: number) {
        const existingDepartment = await this.departmentRepository.findOneById(id);
        if (!existingDepartment) {
            throw new HttpException(404, "Department not found");
        }
        if (existingDepartment.employees.length !== 0) {
            throw new HttpException(406, "Department cannot be deleted when employees are present")
        }
        await this.departmentRepository.delete(existingDepartment);
    }
}

export default DepartmentService;