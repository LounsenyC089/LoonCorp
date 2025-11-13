import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { CreateMaintenanceDto } from './dto/create-maintenance.dto';
import { UpdateMaintenanceDto } from './dto/update-maintenance.dto';

@Injectable()
export class MaintenanceService {
  constructor(private readonly prisma: PrismaService) {}

  create(dto: CreateMaintenanceDto) {
    return this.prisma.maintenanceMensuelle.create({
      data: {
        mois: dto.mois,
        annee: dto.annee,
        datePlanifiee: dto.datePlanifiee ? new Date(dto.datePlanifiee) : undefined,
        dateEffective: dto.dateEffective ? new Date(dto.dateEffective) : undefined,
        realiseParId: dto.realiseParId,
        statut: dto.statut,
        observationsGenerales: dto.observationsGenerales,
        checks: {
          create: dto.checks.map((check) => ({
            tache: check.tache,
            categorie: check.categorie,
            statut: check.statut,
            commentaire: check.commentaire,
          })),
        },
      },
      include: { checks: true, realisePar: true },
    });
  }

  findAll() {
    return this.prisma.maintenanceMensuelle.findMany({
      include: { checks: true, realisePar: true },
      orderBy: [
        { annee: 'desc' },
        { mois: 'desc' },
      ],
    });
  }

  async findOne(id: number) {
    const maintenance = await this.prisma.maintenanceMensuelle.findUnique({
      where: { id },
      include: { checks: true, realisePar: true },
    });
    if (!maintenance) {
      throw new NotFoundException('Maintenance introuvable');
    }
    return maintenance;
  }

  async update(id: number, dto: UpdateMaintenanceDto) {
    await this.findOne(id);
    return this.prisma.maintenanceMensuelle.update({
      where: { id },
      data: {
        mois: dto.mois,
        annee: dto.annee,
        datePlanifiee: dto.datePlanifiee ? new Date(dto.datePlanifiee) : undefined,
        dateEffective: dto.dateEffective ? new Date(dto.dateEffective) : undefined,
        realiseParId: dto.realiseParId,
        statut: dto.statut,
        observationsGenerales: dto.observationsGenerales,
        checks: dto.checks
          ? {
              deleteMany: {},
              create: dto.checks.map((check) => ({
                tache: check.tache,
                categorie: check.categorie,
                statut: check.statut,
                commentaire: check.commentaire,
              })),
            }
          : undefined,
      },
      include: { checks: true, realisePar: true },
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.maintenanceMensuelle.delete({ where: { id } });
  }

  dashboard() {
    return this.prisma.$transaction(async (tx) => {
      const current = await tx.maintenanceMensuelle.findMany({
        where: {
          annee: new Date().getFullYear(),
        },
        include: { checks: true },
      });
      const tauxRealisation = current.length
        ? current.filter((m) => m.statut === 'termine').length / current.length
        : 0;
      const checksManquants = current.flatMap((m) =>
        m.checks.filter((check) => check.statut !== 'termine'),
      );
      const history = await tx.maintenanceMensuelle.findMany({
        take: 12,
        orderBy: [
          { annee: 'desc' },
          { mois: 'desc' },
        ],
      });
      return {
        current,
        tauxRealisation,
        checksManquants,
        history,
      };
    });
  }
}
