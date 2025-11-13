import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDateString,
  IsInt,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateEquipmentDto {
  @ApiProperty({ example: 'N° 32' })
  @IsString()
  numeroAffichage: string;

  @ApiProperty({ example: 'LC-POSTE-0032' })
  @IsString()
  codeInterne: string;

  @ApiProperty({ example: 'PC Portable' })
  @IsString()
  typePoste: string;

  @ApiPropertyOptional({ example: 'Dell' })
  @IsOptional()
  @IsString()
  marque?: string;

  @ApiPropertyOptional({ example: 'Latitude 7420' })
  @IsOptional()
  @IsString()
  modele?: string;

  @ApiPropertyOptional({ example: 'Windows 11 Pro' })
  @IsOptional()
  @IsString()
  systemeExploitation?: string;

  @ApiPropertyOptional({ example: '16 Go' })
  @IsOptional()
  @IsString()
  memoire?: string;

  @ApiPropertyOptional({ example: 'Propriété LoonCorp' })
  @IsOptional()
  @IsString()
  propriete?: string;

  @ApiPropertyOptional({ example: '2022-09-14' })
  @IsOptional()
  @IsDateString()
  dateAcquisition?: string;

  @ApiPropertyOptional({ example: '2023-01-01' })
  @IsOptional()
  @IsDateString()
  dateDebutLocation?: string;

  @ApiPropertyOptional({ example: '2023-10-01' })
  @IsOptional()
  @IsDateString()
  dateInventaire?: string;

  @ApiPropertyOptional({ example: 'En service' })
  @IsOptional()
  @IsString()
  etatActuel?: string;

  @ApiPropertyOptional({ example: 'Intel i7' })
  @IsOptional()
  @IsString()
  processeur?: string;

  @ApiPropertyOptional({ example: '512 Go SSD' })
  @IsOptional()
  @IsString()
  disqueDur?: string;

  @ApiPropertyOptional({ example: 'Dock, Ecran 27"' })
  @IsOptional()
  @IsString()
  peripheriques?: string;

  @ApiPropertyOptional({ example: 'Poste marketing digital' })
  @IsOptional()
  @IsString()
  remarques?: string;

  @ApiPropertyOptional({ example: 'Contrat DELL ProSupport 2025' })
  @IsOptional()
  @IsString()
  contratMaintenance?: string;

  @ApiPropertyOptional({ example: true })
  @IsOptional()
  @IsBoolean()
  misesAJourHebdo?: boolean;

  @ApiPropertyOptional({ example: 2 })
  @IsOptional()
  @IsInt()
  ageCalcule?: number;

  @ApiPropertyOptional({ example: 1 })
  @IsOptional()
  @IsInt()
  serviceId?: number;

  @ApiPropertyOptional({ example: 1 })
  @IsOptional()
  @IsInt()
  utilisateurId?: number;
}
