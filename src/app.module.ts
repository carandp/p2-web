import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import * as path from 'path';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuariosModule } from './usuarios/usuarios.module';
import { BonosModule } from './bonos/bonos.module';
import { ClasesModule } from './clases/clases.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: path.resolve(__dirname, '../.env'),
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST ?? 'localhost',
      port: +(process.env.DB_PORT ?? 5432),
      username: process.env.DB_USERNAME ?? 'postgres',
      password: process.env.DB_PASSWORD ?? 'postgres',
      database: process.env.DB_NAME ?? 'vocablosDB',
      autoLoadEntities: true,
      synchronize: true,
      dropSchema: true,
    }),
    UsuariosModule,
    BonosModule,
    ClasesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
