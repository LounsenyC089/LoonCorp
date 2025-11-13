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
import { AuditsService } from './audits.service';
import { CreateAuditDto } from './dto/create-audit.dto';
import { UpdateAuditDto } from './dto/update-audit.dto';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';

@ApiTags('audits')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('audits')
export class AuditsController {
  constructor(private readonly auditsService: AuditsService) {}

  @Post()
  create(@Body() dto: CreateAuditDto) {
    return this.auditsService.create(dto);
  }

  @Get()
  findAll() {
    return this.auditsService.findAll();
  }

  @Get('dashboard')
  dashboard() {
    return this.auditsService.dashboard();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.auditsService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateAuditDto,
  ) {
    return this.auditsService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.auditsService.remove(id);
  }
}
