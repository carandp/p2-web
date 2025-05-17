import { Module } from '@nestjs/common';
import { ReseniasService } from './resenias.service';
import { ReseniasController } from './resenias.controller';
import { Resenia } from './entities/resenia.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Actividade } from '../actividades/entities/actividade.entity';
import { Estudiante } from '../estudiantes/entities/estudiante.entity';

@Module({
  controllers: [ReseniasController],
  imports: [
    TypeOrmModule.forFeature([Resenia, Actividade, Estudiante])
  ],
  providers: [ReseniasService],
})
export class ReseniasModule {}
