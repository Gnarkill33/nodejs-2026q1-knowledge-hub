import { Transform } from 'class-transformer';
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Role } from 'src/generated/prisma/client';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty({ message: 'Login is required' })
  login: string;

  @IsString()
  @IsNotEmpty({ message: 'Password is required' })
  password: string;

  @IsOptional()
  @Transform(({ value }) => value?.toUpperCase())
  @IsEnum(Role)
  role?: Role;
}
