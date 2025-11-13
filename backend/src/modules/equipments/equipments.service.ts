import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { CreateEquipmentDto } from './dto/create-equipment.dto';
import { UpdateEquipmentDto } from './dto/update-equipment.dto';

@Injectable()
export class EquipmentsService {
  constructor(private readonly prisma: PrismaService) {}

  create(dto: CreateEquipmentDto) {
    return this.prisma.equipement.create({ data: dto });
  }

  findAll(params?: { serviceId?: number; etat?: string }) {
    return this.prisma.equipement.findMany({
      where: {
        serviceId: params?.serviceId,
        etatActuel: params?.etat,
      },
      include: {
        service: true,
        utilisateur: true,
        interventions: true,
        audits: true,
      },
      orderBy: { numeroAffichage: 'asc' },
    });
  }

  async findOne(id: number) {
    const equipement = await this.prisma.equipement.findUnique({
      where: { id },
      include: {
        service: true,
        utilisateur: true,
        interventions: true,
        audits: { include: { audit: true } },
      },
    });
    if (!equipement) throw new NotFoundException('Equipement introuvable');
    return equipement;
  }

  async update(id: number, dto: UpdateEquipmentDto) {
    await this.findOne(id);
    return this.prisma.equipement.update({ where: { id }, data: dto });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.equipement.delete({ where: { id } });
  }

  dashboardSummary() {
    return this.prisma.$transaction(async (tx) => {
      const total = await tx.equipement.count();
      const byEtat = await tx.equipement.groupBy({
        by: ['etatActuel'],
        _count: { _all: true },
      });
      const byService = await tx.equipement.groupBy({
        by: ['serviceId'],
        _count: { _all: true },
      });
      return { total, byEtat, byService };
    });
  }
}
