import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class CreateServiceDto {
  @ApiProperty({ example: 'Marketing & Communication' })
  @IsString()
  nom: string;

  @ApiProperty({ example: 'Direction marketing et communication' })
  @IsOptional()
  @IsString()
  description?: string;
}
