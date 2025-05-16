import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateEstudianteDto } from './dto/create-estudiante.dto';
import { UpdateEstudianteDto } from './dto/update-estudiante.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Estudiante } from './entities/estudiante.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EstudiantesService {
  constructor(
    @InjectRepository(Estudiante)
    private readonly estudianteRepository: Repository<Estudiante>,
  ) {}

  async create(createEstudianteDto: CreateEstudianteDto) {
    if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(createEstudianteDto.correo)) {
      throw new BadRequestException('Correo must be valid');
    }
    if (createEstudianteDto.semestre < 1 || createEstudianteDto.semestre > 10) {
      throw new BadRequestException('Semestre must be between 1-10');
    }
    const estudiante = this.estudianteRepository.create(createEstudianteDto);
    return await this.estudianteRepository.save(estudiante);
  }

  async inscribirseActividad(idEstudiante: number, idActividad: number, updateEstudianteDto: UpdateEstudianteDto) {
    return `This action updates a #${idEstudiante} estudiante`;
  }

  findAll() {
    return `This action returns all estudiantes`;
  }

  findOne(id: number) {
    return `This action returns a #${id} estudiante`;
  }

  update(id: number, updateEstudianteDto: UpdateEstudianteDto) {
    return `This action updates a #${id} estudiante`;
  }

  remove(id: number) {
    return `This action removes a #${id} estudiante`;
  }
}
