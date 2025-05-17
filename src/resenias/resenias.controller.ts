import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ReseniasService } from './resenias.service';
import { CreateReseniaDto } from './dto/create-resenia.dto';

@Controller('resenias')
export class ReseniasController {
  constructor(private readonly reseniasService: ReseniasService) {}

  @Post()
  create(@Body() createReseniaDto: CreateReseniaDto) {
    return this.reseniasService.agregarReseña(createReseniaDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reseniasService.findReseñaById(+id);
  }
}
