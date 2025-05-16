import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateActividadeDto } from './dto/create-actividade.dto';
import { UpdateActividadeDto } from './dto/update-actividade.dto';
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
    if (!/^[a-zA-Z0-9.]*$/.test(createActividadeDto.titulo)) {
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

  async updateEstado(id: number, updateActividadeDto: UpdateActividadeDto) {
    
    return `This action updates a #${id} actividade`;
  }


  findAll() {
    return `This action returns all actividades`;
  }

  findOne(id: number) {
    return `This action returns a #${id} actividade`;
  }

  update(id: number, updateActividadeDto: UpdateActividadeDto) {
    return `This action updates a #${id} actividade`;
  }

  remove(id: number) {
    return `This action removes a #${id} actividade`;
  }
}
