import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ActividadesService } from './actividades.service';
import { CreateActividadeDto } from './dto/create-actividade.dto';
import { UpdateActividadeDto } from './dto/update-actividade.dto';

@Controller('actividades')
export class ActividadesController {
  constructor(private readonly actividadesService: ActividadesService) {}

  @Post()
  create(@Body() createActividadeDto: CreateActividadeDto) {
    return this.actividadesService.create(createActividadeDto);
  }

  @Patch(':id/cambiar_estado/:estado')
  update(@Param('id') id: string, @Param('estado') estado: string) {
    return this.actividadesService.updateEstado(+id, +estado);
  }

  @Get('/by_fecha/:fecha')
  findOne(@Param('fecha') fecha: string) {
    return this.actividadesService.findAllActividadesByDate(fecha);
  }
}
