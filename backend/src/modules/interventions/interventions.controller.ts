import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { InterventionsService } from './interventions.service';
import { CreateInterventionDto } from './dto/create-intervention.dto';
import { UpdateInterventionDto } from './dto/update-intervention.dto';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';

@ApiTags('interventions')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('interventions')
export class InterventionsController {
  constructor(private readonly interventionsService: InterventionsService) {}

  @Post()
  create(@Body() dto: CreateInterventionDto) {
    return this.interventionsService.create(dto);
  }

  @Get()
  @ApiQuery({ name: 'equipementId', required: false, type: Number })
  @ApiQuery({ name: 'statut', required: false })
  @ApiQuery({ name: 'from', required: false })
  @ApiQuery({ name: 'to', required: false })
  findAll(
    @Query('equipementId') equipementId?: string,
    @Query('statut') statut?: string,
    @Query('from') from?: string,
    @Query('to') to?: string,
  ) {
    return this.interventionsService.findAll({
      equipementId: equipementId ? Number(equipementId) : undefined,
      statut: statut || undefined,
      from: from ? new Date(from) : undefined,
      to: to ? new Date(to) : undefined,
    });
  }

  @Get('stats/summary')
  stats() {
    return this.interventionsService.stats();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.interventionsService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateInterventionDto,
  ) {
    return this.interventionsService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.interventionsService.remove(id);
  }
}
