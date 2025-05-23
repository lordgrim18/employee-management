import { Column, Entity, OneToMany } from "typeorm";
import AbstractEntity from "./abstract.entity";
import Employee from "./employee.entity";


@Entity()
export default class Department extends AbstractEntity {
    @Column({unique: true})
    name: string;

    @OneToMany(() => Employee, (employee) => employee.department)
    employees: Employee[];
}