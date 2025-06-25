import { IsEmail, IsString, MinLength, IsBoolean } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateAdminDto {
  @ApiProperty({ example: "John Doe" })
  @IsString()
  full_name: string;

  @ApiProperty({ example: "john@example.com" })
  @IsEmail()
  email: string;

  @ApiProperty({ example: "StrongPass123" })
  @IsString()
  @MinLength(6)
  password: string;

  @ApiProperty({ example: false })
  @IsBoolean()
  is_creator: boolean;

  @ApiProperty({ example: true })
  @IsBoolean()
  is_active: boolean;
}
