import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { MaintenanceService } from './maintenance.service';
import { CreateMaintenanceDto } from './dto/create-maintenance.dto';
import { UpdateMaintenanceDto } from './dto/update-maintenance.dto';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';

@ApiTags('maintenance')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('maintenance')
export class MaintenanceController {
  constructor(private readonly maintenanceService: MaintenanceService) {}

  @Post()
  create(@Body() dto: CreateMaintenanceDto) {
    return this.maintenanceService.create(dto);
  }

  @Get()
  findAll() {
    return this.maintenanceService.findAll();
  }

  @Get('dashboard')
  dashboard() {
    return this.maintenanceService.dashboard();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.maintenanceService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateMaintenanceDto,
  ) {
    return this.maintenanceService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.maintenanceService.remove(id);
  }
}
