import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsDateString, IsInt, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateInterventionDto {
  @ApiProperty({ example: 1 })
  @IsInt()
  equipementId: number;

  @ApiProperty({ example: 'Maintenance préventive' })
  @IsString()
  type: string;

  @ApiPropertyOptional({ example: 'Interne' })
  @IsOptional()
  @IsString()
  origine?: string;

  @ApiPropertyOptional({ example: '2024-02-01' })
  @IsOptional()
  @IsDateString()
  date?: string;

  @ApiPropertyOptional({ example: 'Nettoyage complet du poste' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({ example: 120 })
  @IsOptional()
  @IsNumber()
  cout?: number;

  @ApiPropertyOptional({ example: 'Alice Martin' })
  @IsOptional()
  @IsString()
  technicien?: string;

  @ApiPropertyOptional({ example: 'termine' })
  @IsOptional()
  @IsString()
  statut?: string;
}
