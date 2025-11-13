import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { CreateAuditDto } from './dto/create-audit.dto';
import { UpdateAuditDto } from './dto/update-audit.dto';

@Injectable()
export class AuditsService {
  constructor(private readonly prisma: PrismaService) {}

  create(dto: CreateAuditDto) {
    return this.prisma.audit.create({
      data: {
        dateAudit: dto.dateAudit ? new Date(dto.dateAudit) : undefined,
        auditeurId: dto.auditeurId,
        serviceConcerneId: dto.serviceConcerneId,
        nombreIncidents: dto.nombreIncidents,
        equipementsNonConformes: dto.equipementsNonConformes,
        etatGlobal: dto.etatGlobal,
        synthese: dto.synthese,
        recommandations: dto.recommandations,
        auditEquipements: {
          create: dto.equipements.map((eq) => ({
            equipementId: eq.equipementId,
            conformiteMateriel: eq.conformiteMateriel,
            conformiteLogiciel: eq.conformiteLogiciel,
            conformiteSecurite: eq.conformiteSecurite,
            observations: eq.observations,
          })),
        },
      },
      include: { auditEquipements: true },
    });
  }

  findAll() {
    return this.prisma.audit.findMany({
      include: {
        auditEquipements: { include: { equipement: true } },
        auditeur: true,
        serviceConcerne: true,
      },
      orderBy: { dateAudit: 'desc' },
    });
  }

  async findOne(id: number) {
    const audit = await this.prisma.audit.findUnique({
      where: { id },
      include: {
        auditEquipements: { include: { equipement: true } },
        auditeur: true,
        serviceConcerne: true,
      },
    });
    if (!audit) throw new NotFoundException('Audit introuvable');
    return audit;
  }

  async update(id: number, dto: UpdateAuditDto) {
    await this.findOne(id);
    return this.prisma.audit.update({
      where: { id },
      data: {
        dateAudit: dto.dateAudit ? new Date(dto.dateAudit) : undefined,
        auditeurId: dto.auditeurId,
        serviceConcerneId: dto.serviceConcerneId,
        nombreIncidents: dto.nombreIncidents,
        equipementsNonConformes: dto.equipementsNonConformes,
        etatGlobal: dto.etatGlobal,
        synthese: dto.synthese,
        recommandations: dto.recommandations,
        auditEquipements: dto.equipements
          ? {
              deleteMany: {},
              create: dto.equipements.map((eq) => ({
                equipementId: eq.equipementId,
                conformiteMateriel: eq.conformiteMateriel,
                conformiteLogiciel: eq.conformiteLogiciel,
                conformiteSecurite: eq.conformiteSecurite,
                observations: eq.observations,
              })),
            }
          : undefined,
      },
      include: {
        auditEquipements: { include: { equipement: true } },
        auditeur: true,
        serviceConcerne: true,
      },
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.audit.delete({ where: { id } });
  }

  dashboard() {
    return this.prisma.$transaction(async (tx) => {
      const audits = await tx.audit.count();
      const moyenneIncidents = await tx.audit.aggregate({
        _avg: { nombreIncidents: true },
      });
      const conformiteParService = await tx.audit.groupBy({
        by: ['serviceConcerneId'],
        _avg: { equipementsNonConformes: true },
        _count: { _all: true },
      });
      const nonConformes = await tx.auditEquipement.findMany({
        where: {
          OR: [
            { conformiteMateriel: { not: 'OK' } },
            { conformiteLogiciel: { not: 'OK' } },
            { conformiteSecurite: { not: 'OK' } },
          ],
        },
        include: { equipement: true, audit: true },
      });
      return {
        audits,
        moyenneIncidents: moyenneIncidents._avg.nombreIncidents ?? 0,
        conformiteParService,
        nonConformes,
      };
    });
  }
}
