import { Module } from '@nestjs/common';
import { ActividadesService } from './actividades.service';
import { ActividadesController } from './actividades.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Actividade } from './entities/actividade.entity';

@Module({
  controllers: [ActividadesController],
  imports: [TypeOrmModule.forFeature([Actividade])],
  providers: [ActividadesService],
})
export class ActividadesModule {}
