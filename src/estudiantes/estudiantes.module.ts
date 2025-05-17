import { Module } from '@nestjs/common';
import { EstudiantesService } from './estudiantes.service';
import { EstudiantesController } from './estudiantes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Estudiante } from './entities/estudiante.entity';
import { Actividade } from '../actividades/entities/actividade.entity';

@Module({
  controllers: [EstudiantesController],
  imports: [
    TypeOrmModule.forFeature([Estudiante, Actividade])
  ],
  providers: [EstudiantesService],
})
export class EstudiantesModule {}
