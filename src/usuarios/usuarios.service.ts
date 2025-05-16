import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { Usuario } from './entities/usuario.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsuariosService {

  async crearUsuario(createUsuarioDto: CreateUsuarioDto) {
    if (createUsuarioDto.rol === 'Profesor') {
      if (!['TICSW', 'IMAGINE', 'COMIT'].includes(createUsuarioDto.grupoInvestigacion)) {
        throw new BadRequestException('Grupo de investigación no válido');
      }
    }
    if (createUsuarioDto.rol === 'Decana') {
      if (!/^\d{8}/.test(String(createUsuarioDto.numExtension))) {
        throw new BadRequestException('Número de extensión no válido');
      }
    }
  }

  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
  ) {}

  async create(createUsuarioDto: CreateUsuarioDto) {
    await this.crearUsuario(createUsuarioDto);
    const usuario = this.usuarioRepository.create(createUsuarioDto);
    return await this.usuarioRepository.save(usuario);
  }

  findAll() {
    return `This action returns all usuarios`;
  }

  async findOne(id: string) {
    const usuario = await this.usuarioRepository.findOne({ where: { id } });
    if (!usuario) {
      throw new NotFoundException(`Usuario con id ${id} no encontrado`);
    }
    return usuario;
  }

  update(id: string, updateUsuarioDto: UpdateUsuarioDto) {
    return `This action updates a #${id} usuario`;
  }

  async remove(id: string) {
    const usuario = await this.findOne(id);
    if (!usuario) {
      throw new NotFoundException(`Usuario con id ${id} no encontrado`);
    }
    if (usuario.rol === 'Decana') {
      throw new BadRequestException('No se puede eliminar un usuario con rol de Decana');
    }
    return await this.usuarioRepository.remove(usuario);
  }
}
