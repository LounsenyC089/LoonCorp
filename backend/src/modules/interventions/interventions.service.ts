import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { CreateInterventionDto } from './dto/create-intervention.dto';
import { UpdateInterventionDto } from './dto/update-intervention.dto';

type Filters = {
  equipementId?: number;
  statut?: string;
  from?: Date;
  to?: Date;
};

@Injectable()
export class InterventionsService {
  constructor(private readonly prisma: PrismaService) {}

  create(dto: CreateInterventionDto) {
    return this.prisma.intervention.create({ data: dto });
  }

  findAll(filters: Filters = {}) {
    return this.prisma.intervention.findMany({
      where: {
        equipementId: filters.equipementId,
        statut: filters.statut,
        date: {
          gte: filters.from,
          lte: filters.to,
        },
      },
      include: { equipement: true },
      orderBy: { date: 'desc' },
    });
  }

  async findOne(id: number) {
    const intervention = await this.prisma.intervention.findUnique({
      where: { id },
      include: { equipement: true },
    });
    if (!intervention) throw new NotFoundException('Intervention introuvable');
    return intervention;
  }

  async update(id: number, dto: UpdateInterventionDto) {
    await this.findOne(id);
    return this.prisma.intervention.update({ where: { id }, data: dto });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.intervention.delete({ where: { id } });
  }

  stats() {
    return this.prisma.intervention.groupBy({
      by: ['type'],
      _count: { _all: true },
    });
  }
}
