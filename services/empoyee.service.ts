import { CreateAddressDto } from "../dto/create-address.dto";
import UpdateAddressDto from "../dto/update-address.dto";
import Address from "../entities/address.entity";
import Employee, { EmployeeRole } from "../entities/employee.entity";
import EmployeeRepository from "../repositories/employee.repository";
import bcrypt from 'bcrypt';

class EmployeeService {
    constructor(private employeeRepository: EmployeeRepository) {}

    async getAllEmployees(): Promise<Employee[]> {
        return this.employeeRepository.findMany();
    }

    async getEmployeeById(id: number): Promise<Employee> {
        return this.employeeRepository.findOneById(id);
    }

    async getEmployeeByEmail(email: string): Promise<Employee | null> {
        return this.employeeRepository.findByEmail(email);
    }

    async createEmployee(email:string, name: string, age:number, role:EmployeeRole, address:CreateAddressDto, password:string): Promise<Employee> {
        const newAddress = new Address();
        newAddress.line1 = address.line1;
        newAddress.pincode = address.pincode;
        const newEmployee = new Employee();
        newEmployee.name = name;
        newEmployee.email = email;
        newEmployee.age = age;
        newEmployee.role = role;
        newEmployee.address = newAddress;
        newEmployee.password = await bcrypt.hash(password, 10);
        return this.employeeRepository.create(newEmployee);
    }

    async updateEmployee(id: number, email: string, name: string, age: number, address:UpdateAddressDto)  {
        const existingEmployee = await this.employeeRepository.findOneById(id);
        if (existingEmployee) {
            const employee = new Employee();
            employee.name = name;
            employee.email = email;
            employee.age = age;
            const newAddress = new Address();
            newAddress.line1 = address.line1;
            newAddress.pincode = address.pincode;
            employee.address = newAddress;
            await this.employeeRepository.update(id, employee)
        }
    }

    async deleteEmployee(id: number) {
        const existingEmployee = await this.employeeRepository.findOneById(id);
        if (existingEmployee) {
            await this.employeeRepository.delete(existingEmployee);
        }
    }
}

export default EmployeeService;