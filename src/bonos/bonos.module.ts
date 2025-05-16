import { Module } from '@nestjs/common';
import { BonosService } from './bonos.service';
import { BonosController } from './bonos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bono } from './entities/bono.entity';

@Module({
  controllers: [BonosController],
  imports: [TypeOrmModule.forFeature([Bono])],
  providers: [BonosService],
})
export class BonosModule {}
