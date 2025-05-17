import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EstudiantesService } from './estudiantes.service';
import { CreateEstudianteDto } from './dto/create-estudiante.dto';

@Controller('estudiantes')
export class EstudiantesController {
  constructor(private readonly estudiantesService: EstudiantesService) {}

  @Post()
  create(@Body() createEstudianteDto: CreateEstudianteDto) {
    return this.estudiantesService.crearEstudiante(createEstudianteDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.estudiantesService.findEstudianteById(+id);
  }

  @Patch(':idEstudiante/inscribir/:idActividad')
  update(@Param('idEstudiante') idEstudiante: string, @Param('idActividad') idActividad: string) {
    return this.estudiantesService.inscribirseActividad(+idEstudiante, +idActividad);
  }
}
