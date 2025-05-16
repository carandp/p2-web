import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ReseniasService } from './resenias.service';
import { CreateReseniaDto } from './dto/create-resenia.dto';
import { UpdateReseniaDto } from './dto/update-resenia.dto';

@Controller('resenias')
export class ReseniasController {
  constructor(private readonly reseniasService: ReseniasService) {}

  @Post()
  create(@Body() createReseniaDto: CreateReseniaDto) {
    return this.reseniasService.create(createReseniaDto);
  }

  @Get()
  findAll() {
    return this.reseniasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reseniasService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateReseniaDto: UpdateReseniaDto) {
    return this.reseniasService.update(+id, updateReseniaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.reseniasService.remove(+id);
  }
}
