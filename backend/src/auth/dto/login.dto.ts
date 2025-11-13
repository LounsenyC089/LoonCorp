import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty({ example: 'jdoe' })
  @IsString()
  login: string;

  @ApiProperty({ example: 'MotDePasse#2024' })
  @IsString()
  password: string;
}
