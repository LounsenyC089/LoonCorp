import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString } from 'class-validator';

export class MaintenanceCheckDto {
  @ApiProperty({ example: 'Vérification des mises à jour système' })
  @IsString()
  tache: string;

  @ApiPropertyOptional({ example: 'Système' })
  @IsOptional()
  @IsString()
  categorie?: string;

  @ApiPropertyOptional({ example: 'termine' })
  @IsOptional()
  @IsString()
  statut?: string;

  @ApiPropertyOptional({ example: 'RAS' })
  @IsOptional()
  @IsString()
  commentaire?: string;

  @ApiPropertyOptional({ example: 1 })
  @IsOptional()
  @IsInt()
  id?: number;
}
