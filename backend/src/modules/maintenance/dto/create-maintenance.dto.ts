import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsDateString,
  IsInt,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { MaintenanceCheckDto } from './maintenance-check.dto';

export class CreateMaintenanceDto {
  @ApiProperty({ example: 2 })
  @IsInt()
  mois: number;

  @ApiProperty({ example: 2024 })
  @IsInt()
  annee: number;

  @ApiPropertyOptional({ example: '2024-02-01' })
  @IsOptional()
  @IsDateString()
  datePlanifiee?: string;

  @ApiPropertyOptional({ example: '2024-02-03' })
  @IsOptional()
  @IsDateString()
  dateEffective?: string;

  @ApiPropertyOptional({ example: 4 })
  @IsOptional()
  @IsInt()
  realiseParId?: number;

  @ApiPropertyOptional({ example: 'en_cours' })
  @IsOptional()
  @IsString()
  statut?: string;

  @ApiPropertyOptional({ example: 'RAS' })
  @IsOptional()
  @IsString()
  observationsGenerales?: string;

  @ApiProperty({ type: [MaintenanceCheckDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => MaintenanceCheckDto)
  checks: MaintenanceCheckDto[];
}
