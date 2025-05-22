import { IsEmail, IsNotEmpty, IsNumber, IsString, MinLength, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import UpdateAddressDto from "./update-address.dto";

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

//   @IsNotEmpty()
//   @IsString()
//   @MinLength(5)
//   password: string;
}