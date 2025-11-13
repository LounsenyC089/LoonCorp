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
import { AuditEquipmentDto } from './audit-equipment.dto';

export class CreateAuditDto {
  @ApiProperty({ example: '2024-02-15' })
  @IsOptional()
  @IsDateString()
  dateAudit?: string;

  @ApiPropertyOptional({ example: 3 })
  @IsOptional()
  @IsInt()
  auditeurId?: number;

  @ApiPropertyOptional({ example: 2 })
  @IsOptional()
  @IsInt()
  serviceConcerneId?: number;

  @ApiProperty({ example: 5 })
  @IsInt()
  nombreIncidents: number;

  @ApiProperty({ example: 3 })
  @IsInt()
  equipementsNonConformes: number;

  @ApiProperty({ example: 'A surveiller' })
  @IsString()
  etatGlobal: string;

  @ApiPropertyOptional({ example: 'Synthèse de la situation' })
  @IsOptional()
  @IsString()
  synthese?: string;

  @ApiPropertyOptional({ example: 'Mettre à jour les antivirus rapidement' })
  @IsOptional()
  @IsString()
  recommandations?: string;

  @ApiProperty({ type: [AuditEquipmentDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AuditEquipmentDto)
  equipements: AuditEquipmentDto[];
}
