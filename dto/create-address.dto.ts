import { IsNotEmpty, IsString } from "class-validator";

export class CreateAddressDto {
  @IsNotEmpty()
  @IsString()
  line1: string;

  @IsString()
  line2: string | null;

  @IsString()
  houseNo: string | null;

  @IsNotEmpty()
  @IsString()
  pincode: string;
}