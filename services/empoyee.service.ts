import { CreateAddressDto } from "../dto/create-address.dto";
import Address from "../entities/address.entity";
import Employee from "../entities/employee.entity";
import EmployeeRepository from "../repositories/employee.repository";

class EmployeeService {
    constructor(private employeeRepository: EmployeeRepository) {}

    async getAllEmployees(): Promise<Employee[]> {
        return this.employeeRepository.findMany();
    }

    async getEmployeeById(id: number): Promise<Employee> {
        return this.employeeRepository.findOneById(id);
    }

    async createEmployee(email:string, name: string, age:number, address:CreateAddressDto): Promise<Employee> {
        const newAddress = new Address();
        newAddress.line1 = address.line1;
        newAddress.pincode = address.pincode;
        const newEmployee = new Employee();
        newEmployee.name = name;
        newEmployee.email = email;
        newEmployee.age = age;
        newEmployee.address = newAddress;
        return this.employeeRepository.create(newEmployee);
    }

    async updateEmployee(id: number, name: string, email: string) {
        const existingEmployee = await this.employeeRepository.findOneById(id);
        if (existingEmployee) {
            const employee = new Employee();
            employee.name = name;
            employee.email = email;
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