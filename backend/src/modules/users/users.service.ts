import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateUserDto) {
    const passwordHash = await bcrypt.hash(dto.password, 10);
    return this.prisma.utilisateur.create({
      data: {
        nomComplet: dto.nomComplet,
        login: dto.login,
        email: dto.email,
        role: dto.role ?? 'user',
        serviceId: dto.serviceId,
        passwordHash,
      },
      include: { service: true },
    });
  }

  findAll() {
    return this.prisma.utilisateur.findMany({
      include: { service: true },
      orderBy: { nomComplet: 'asc' },
    });
  }

  async findOne(id: number) {
    const user = await this.prisma.utilisateur.findUnique({
      where: { id },
      include: { service: true },
    });
    if (!user) throw new NotFoundException('Utilisateur introuvable');
    return user;
  }

  async update(id: number, dto: UpdateUserDto) {
    await this.findOne(id);
    const data: any = { ...dto };
    if (dto.password) {
      data.passwordHash = await bcrypt.hash(dto.password, 10);
      delete data.password;
    }
    return this.prisma.utilisateur.update({
      where: { id },
      data: {
        nomComplet: data.nomComplet,
        login: data.login,
        email: data.email,
        role: data.role,
        serviceId: data.serviceId,
        passwordHash: data.passwordHash,
      },
      include: { service: true },
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.utilisateur.delete({ where: { id } });
  }
}
