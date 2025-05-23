import { IsDate, IsEmail, IsEnum, IsNotEmpty, IsNumber, IsString, MinLength, ValidateNested } from "class-validator";
import { CreateAddressDto } from "./create-address.dto";
import { Type } from "class-transformer";
import { EmployeeRole, STATUS } from "../entities/employee.entity";

export class CreateEmployeeDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  age: number;

  @ValidateNested()
  @Type(() => CreateAddressDto)
  address: CreateAddressDto;

  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  password: string;

  @IsNotEmpty()
  @IsEnum(EmployeeRole)
  role: EmployeeRole;

  @IsNotEmpty()
  @IsNumber()
  departmentId: number;

  @IsNotEmpty()
  @IsString()
  dateOfJoining: string;

  @IsNotEmpty()
  @IsNumber()
  experience: number;

  @IsNotEmpty()
  @IsEnum(STATUS)
  status: STATUS;
  
}