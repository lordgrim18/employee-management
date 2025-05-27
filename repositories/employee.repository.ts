import {Repository} from "typeorm";
import Employee from "../entities/employee.entity";

class EmployeeRepository {
    constructor(private repository: Repository<Employee>) {}

    async create(employee: Employee): Promise<Employee> {
        return this.repository.save(employee)
    }

    async findMany(): Promise<Employee[]> {
        return this.repository.find({
            select: {
                id: true,
                employeeId: true,
                name: true,
                email: true,
                age: true,
                dateOfJoining: true,
                experience: true,
                role: true,
                status: true,
                department: {
                    id: true,
                    name: true
                },           
                address: {
                    line1: true,
                    line2: true,
                    houseNo: true,
                    pincode: true
                }
            },
            relations: {
                address: true,
                department: true,
            }
        })
    }

    async findOneById(id: number): Promise<Employee> {
        return this.repository.findOne({
            where: { id },
            relations: {
                address: true,
            }
        }); 
    }

    async findByEmail(email: string): Promise<Employee> {
        return this.repository.findOneBy({ email });
    }

    async update(id:number, employee: Employee): Promise<void> {
        await this.repository.save({id, ...employee});
    }

    async delete(employee: Employee): Promise<void> {
        await this.repository.softRemove(employee);
    }
}

export default EmployeeRepository;