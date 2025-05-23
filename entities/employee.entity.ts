import { Column, Entity, Generated, JoinColumn, ManyToOne, OneToOne} from "typeorm"
import AbstractEntity from "./abstract.entity";
import Address from "./address.entity";
import Department from "./department.entity";

export enum EmployeeRole {
  UI = 'UI',
  UX = 'UX',
  DEVELOPER = 'DEVELOPER',
  HR = 'HR'
}

export enum STATUS {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  PROBATION = 'PROBATION'
}


@Entity()
class Employee extends AbstractEntity {
    @Column({unique: true})
    email: string;

    @Column()
    name: string;

    @Column()
    age: number;

    @OneToOne(() => Address, (address) => address.employee, {
    cascade: true
    })
    address: Address
    
    @Column()
    password: string;

    @Column({
      type: 'enum',
      enum: EmployeeRole,
      default: EmployeeRole.DEVELOPER
    })
    role: EmployeeRole

    @ManyToOne(() => Department, (department) => department.employees)
    department: Department

    @Column()
    departmentId: number;

    @Column({unique: true})
    @Generated("uuid")
    employeeId: string;

    @Column({ type: 'date' })
    dateOfJoining: string

    @Column()
    experience: number;

    @Column({
      type: 'enum',
      enum: STATUS,
      default: STATUS.ACTIVE
    })
    status: STATUS
  }
  
  export default Employee;
  