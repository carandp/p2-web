import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateActividadeDto } from './dto/create-actividade.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Actividade } from './entities/actividade.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ActividadesService {
  constructor(
    @InjectRepository(Actividade)
    private readonly actividadeRepository: Repository<Actividade>,
  ) {}

  async create(createActividadeDto: CreateActividadeDto) {
    if (!/^[a-zA-Z0-9. áéíóúÁÉÍÓÚñÑ]*$/.test(createActividadeDto.titulo)) {
      throw new BadRequestException('Titulo cant have special characters');
    }
    if (createActividadeDto.titulo.length < 15) {
      throw new BadRequestException('Titulo length must be of at least 15 characters');
    }
    if (createActividadeDto.estado != 0) {
      throw new BadRequestException('Estado must be 0');
    }
    const actividade = this.actividadeRepository.create(createActividadeDto);
    return await this.actividadeRepository.save(actividade);
  }

  async updateEstado(id: number, estado: number) {
    const actividade = await this.actividadeRepository.findOne({ where: { id }, relations: ['estudiantes'] });
    if (!actividade) {
      throw new NotFoundException(`Actividade with id ${id} not found`);
    }
    if (estado === 0 && actividade.estado !== 0) {
      actividade.estado = estado;
      return await this.actividadeRepository.save(actividade);
    } else if (estado === 1) {
      if (actividade.estudiantes.length / actividade.cupoMaximo >= 0.8) {
        actividade.estado = estado;
        return await this.actividadeRepository.save(actividade);
      } else {
        throw new BadRequestException(`Actividade with id ${id} ocupation is less than 80%`);
      }
    } else if (estado === 2) {
      if (actividade.estudiantes.length === actividade.cupoMaximo) {
        actividade.estado = estado;
        return await this.actividadeRepository.save(actividade);
      } else {
        throw new BadRequestException(`Actividade with id ${id} is not full`);
      }
    } else {
      throw new BadRequestException(`Invalid estado value`);
    }
  }

  async findAllActividadesByDate(fecha: string) {
    const actividades = await this.actividadeRepository.find({
      where: { fecha },
    });
    if (actividades.length === 0) {
      throw new NotFoundException(`No actividades found for date ${fecha}`);
    }
    return actividades;
  }

  async findOne(id: number) {
    const actividade = await this.actividadeRepository.findOne({ where: { id } });
    if (!actividade) {
      throw new NotFoundException(`Actividade with id ${id} not found`);
    }
    return actividade;
  }
}
