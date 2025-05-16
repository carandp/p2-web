import { Module } from '@nestjs/common';
import { ReseniasService } from './resenias.service';
import { ReseniasController } from './resenias.controller';
import { Resenia } from './entities/resenia.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [ReseniasController],
  imports: [TypeOrmModule.forFeature([Resenia])],
  providers: [ReseniasService],
})
export class ReseniasModule {}
