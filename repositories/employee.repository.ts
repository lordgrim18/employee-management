import {Repository} from "typeorm";
import Employee from "../entities/employee.entity";

class EmployeeRepository {
    constructor(private repository: Repository<Employee>) {}

    async create(employee: Employee): Promise<Employee> {
        return this.repository.save(employee)
    }

    async findMany(): Promise<Employee[]> {
        return this.repository.find({
            relations: {
                address: true
            }
        })
    }

    async findOneById(id: number): Promise<Employee> {
        return this.repository.findOne({
            where: { id },
            relations: {
                address: true
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
        await this.repository.remove(employee);
    }
}

export default EmployeeRepository;