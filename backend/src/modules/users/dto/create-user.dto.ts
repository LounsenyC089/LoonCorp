import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'Jean Dupont' })
  @IsString()
  nomComplet: string;

  @ApiProperty({ example: 'jdupont' })
  @IsString()
  login: string;

  @ApiProperty({ example: 'jean.dupont@entreprise.com', required: false })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiProperty({ example: 'marketing' })
  @IsOptional()
  @IsString()
  role?: string;

  @ApiProperty({ example: 1, required: false })
  @IsOptional()
  serviceId?: number;

  @ApiProperty({ example: 'MotDePasseFort#2024' })
  @IsString()
  @MinLength(8)
  password: string;
}
