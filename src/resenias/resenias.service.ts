import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateReseniaDto } from './dto/create-resenia.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Resenia } from './entities/resenia.entity';
import { Not, Repository } from 'typeorm';
import { Estudiante } from '../estudiantes/entities/estudiante.entity';
import { Actividade } from '../actividades/entities/actividade.entity';

@Injectable()
export class ReseniasService {
  constructor(
    @InjectRepository(Resenia)
    private readonly reseniaRepository: Repository<Resenia>,

    @InjectRepository(Estudiante)
    private readonly estudianteRepository: Repository<Estudiante>,

    @InjectRepository(Actividade)
    private readonly actividadeRepository: Repository<Actividade>,
  ) {}

  async agregarReseña(createReseniaDto: CreateReseniaDto) {
    const actividade = await this.actividadeRepository.findOne({ where: { id: createReseniaDto.actividade } });
    if (!actividade) {
      throw new NotFoundException('Actividade not found');
    }
    if (actividade.estado !== 2) {
      throw new BadRequestException('Actividade is not in the correct estado');
    }
    const estudiante = await this.estudianteRepository.findOne({ where: { id: createReseniaDto.estudiante }, relations: ['actividades'] });
    if (!estudiante) {
      throw new NotFoundException('Estudiante not found');
    }
    if (!(estudiante.actividades.some((actividad) => actividad.id === actividade.id))) {
      throw new BadRequestException('Estudiante is not enrolled in the actividad');
    }
    const resenia = this.reseniaRepository.create({
      ...createReseniaDto,
      estudiante: estudiante,
      actividade: actividade,
    });
    return await this.reseniaRepository.save(resenia);
  }

  async findReseñaById(id: number) {
    const resenia = await this.reseniaRepository.findOne({ where: { id } });
    if (!resenia) {
      throw new NotFoundException(`Resenia with id ${id} not found`);
    }
    return resenia;
  }
}
