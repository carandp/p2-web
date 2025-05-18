import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateEstudianteDto } from './dto/create-estudiante.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Estudiante } from './entities/estudiante.entity';
import { In, Repository } from 'typeorm';
import { Actividade } from "../actividades/entities/actividade.entity";

@Injectable()
export class EstudiantesService {
  constructor(
    @InjectRepository(Estudiante)
    private readonly estudianteRepository: Repository<Estudiante>,

    @InjectRepository(Actividade)
    private readonly actividadeRepository: Repository<Actividade>,
  ) {}

  async crearEstudiante(createEstudianteDto: CreateEstudianteDto) {
    if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(createEstudianteDto.correo)) {
      throw new BadRequestException('Correo must be valid');
    }
    if (createEstudianteDto.semestre < 1 || createEstudianteDto.semestre > 10) {
      throw new BadRequestException('Semestre must be between 1-10');
    }
    const estudiante = this.estudianteRepository.create(createEstudianteDto);
    return await this.estudianteRepository.save(estudiante);
  }

  async findEstudianteById(id: number) {
    const estudiante = await this.estudianteRepository.findOne({ where: { id } });
    if (!estudiante) {
      throw new NotFoundException(`Estudiante with id ${id} not found`);
    }
    return estudiante;
  }

  async inscribirseActividad(idEstudiante: number, idActividad: number) {
    const estudiante = await this.estudianteRepository.findOne({ where: { id: idEstudiante }, relations: ['actividades'] });
    if (!estudiante) {
      throw new NotFoundException(`Estudiante with id ${idEstudiante} not found`);
    }

    const actividad = await this.actividadeRepository.findOne({ where: { id: idActividad }, relations: ['estudiantes']});
    if (!actividad) {
      throw new NotFoundException(`Actividad with id ${idActividad} not found`);
    }

    if (actividad.estudiantes.length >= actividad.cupoMaximo) {
      throw new BadRequestException(`Actividad with id ${idActividad} is full`);
    }

    if (actividad.estado !== 0) {
      throw new BadRequestException(`Actividad with id ${idActividad} is not available`);
    }

    if (estudiante.actividades.some((actividad) => actividad.id === idActividad)) {
      throw new BadRequestException(`Estudiante with id ${idEstudiante} is already enrolled in actividad with id ${idActividad}`);
    }

    estudiante.actividades.push(actividad);
    await this.estudianteRepository.save(estudiante);

    return estudiante;
  }
}
