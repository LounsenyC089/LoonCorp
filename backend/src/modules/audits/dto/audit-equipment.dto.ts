import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString } from 'class-validator';

export class AuditEquipmentDto {
  @ApiProperty({ example: 1 })
  @IsInt()
  equipementId: number;

  @ApiProperty({ example: 'OK' })
  @IsString()
  conformiteMateriel: string;

  @ApiProperty({ example: 'A revoir' })
  @IsString()
  conformiteLogiciel: string;

  @ApiProperty({ example: 'Non conforme' })
  @IsString()
  conformiteSecurite: string;

  @ApiPropertyOptional({ example: 'Antivirus expiré' })
  @IsOptional()
  @IsString()
  observations?: string;
}
