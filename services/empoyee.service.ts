import Address from "../entities/address.entity";
import Employee, { EmployeeRole } from "../entities/employee.entity";
import EmployeeRepository from "../repositories/employee.repository";
import bcrypt from 'bcrypt';
import { LoggerService } from "./logger.service";
import HttpException from "../exception/httpException";
import { CreateEmployeeDto } from "../dto/create-employee.dto";
import { UpdateEmployeeDto } from "../dto/update-employee.dto";
import DepartmentRepository from "../repositories/department.repository";



class EmployeeService {
    private logger: LoggerService;
    constructor(
        private employeeRepository: EmployeeRepository,
        private departmentRepository: DepartmentRepository
    ) {
        
        this.logger = LoggerService.getInstance(EmployeeService.name)
    }

    async getAllEmployees(): Promise<Employee[]> {
        return this.employeeRepository.findMany();
    }

    async getEmployeeById(id: number): Promise<Employee> {
        let employee = await this.employeeRepository.findOneById(id);
        this.logger.info(employee);
        if(!employee) {
            throw new Error("Employee not found");
        }
        return employee;
    }

    async getEmployeeByEmail(email: string): Promise<Employee | null> {
        let employee = await this.employeeRepository.findByEmail(email);
        if (!employee) {
            throw new Error("Employee not found");
        }
        return employee;
    }

    async createEmployee(employee: CreateEmployeeDto): Promise<Employee> {
        const newAddress = new Address();
        newAddress.line1 = employee.address.line1;
        newAddress.line2 = employee.address.line2;
        newAddress.houseNo = employee.address.houseNo
        newAddress.pincode = employee.address.pincode;
        const newEmployee = new Employee();
        newEmployee.name = employee.name;
        newEmployee.email = employee.email;
        newEmployee.age = employee.age;
        newEmployee.role = employee.role;
        newEmployee.dateOfJoining = employee.dateOfJoining;
        newEmployee.experience = employee.experience;
        newEmployee.status = employee.status;
        newEmployee.address = newAddress;
        newEmployee.password = await bcrypt.hash(employee.password, 10);
        const employeeDepartment = await this.departmentRepository.findOneById(employee.departmentId)
        if (!employeeDepartment) {
            throw new HttpException(400, "Department not found")
        }
        newEmployee.departmentId = employeeDepartment.id;
        return this.employeeRepository.create(newEmployee);
    }

    async updateEmployee(id: number, employee: UpdateEmployeeDto)  {
        const existingEmployee = await this.employeeRepository.findOneById(id);
        if (existingEmployee) {
            const newEmployee = new Employee();
            newEmployee.name = employee.name;
            newEmployee.email = employee.email;
            newEmployee.age = employee.age;
            newEmployee.role = employee.role;
            newEmployee.dateOfJoining = employee.dateOfJoining;
            newEmployee.experience = employee.experience;
            newEmployee.status = employee.status;
            const employeeDepartment = await this.departmentRepository.findOneById(employee.departmentId)
            if (!employeeDepartment) {
                throw new HttpException(400, "Department not found")
            }
            newEmployee.department = employeeDepartment;
            const existingAddress = existingEmployee.address;
            existingAddress.line1 = employee.address.line1;
            existingAddress.line2 = employee.address.line2;
            existingAddress.houseNo = employee.address.houseNo;
            existingAddress.pincode = employee.address.pincode;
            newEmployee.address = existingAddress;
            await this.employeeRepository.update(id, newEmployee)
        } else {
            throw new HttpException(404, "Employee not found");
        }
    }

    async deleteEmployee(id: number) {
        const existingEmployee = await this.employeeRepository.findOneById(id);
        if (!existingEmployee) {
            throw new HttpException(404, "Employee not found");
        }
        await this.employeeRepository.delete(existingEmployee);
    }
}

export default EmployeeService;