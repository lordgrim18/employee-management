import { IsEmail, IsEnum, IsNotEmpty, IsNumber, IsString, MinLength, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import UpdateAddressDto from "./update-address.dto";
import { EmployeeRole } from "../entities/employee.entity";

export class UpdateEmployeeDto {
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
  @Type(() => UpdateAddressDto)
  address: UpdateAddressDto;

  @IsNotEmpty()
  @IsEnum(EmployeeRole)
  role: EmployeeRole;

  @IsNotEmpty()
  @IsNumber()
  departmentId: number;
}