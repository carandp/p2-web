import { Module } from '@nestjs/common';
import { ClasesService } from './clases.service';
import { ClasesController } from './clases.controller';
import { Clase } from './entities/clase.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [ClasesController],
  imports: [TypeOrmModule.forFeature([Clase])],
  providers: [ClasesService],
})
export class ClasesModule {}
