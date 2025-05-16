import { Module } from '@nestjs/common';
import { EstudiantesService } from './estudiantes.service';
import { EstudiantesController } from './estudiantes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Estudiante } from './entities/estudiante.entity';

@Module({
  controllers: [EstudiantesController],
  imports: [TypeOrmModule.forFeature([Estudiante])],
  providers: [EstudiantesService],
})
export class EstudiantesModule {}
