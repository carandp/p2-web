# Project setup, compile and run:

1. Run
```bash 
$ npm i
```
2. Create .env using as a base env.template
3. Run 
```bash
$ docker-compose up -d
```
4. Run
```bash
$ npm start run:dev
```

# Steps to replicate project:
1. npm i -g @nestjs/cli
2. nest new <project_name>
3. Add docker-compose.yaml and env.template
4. Create .env using as a base env.template
5. Run 
```bash
$ docker-compose up -d
```
6. Add /postgress to .gitignore file
7. Add dependencies 
```bash
$ npm install --save class-transformer class-validator pg postgres typeorm @nestjs/config @nestjs/mapped-types @nestjs/typeorm
```
8. Enable API versioning in main.ts
```ts
app.enableCors({
    origin: 'http://localhost:3000', // Cambia esto a la URL de tu frontend
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });
  
  app.enableVersioning({
    type: VersioningType.URI,
    prefix: 'api/v',
    defaultVersion: '1',
  });

  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3001);
```
9. Enable connection to postgres db via typeorm in app.module.ts
```ts
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import * as path from 'path';
import { TypeOrmModule } from '@nestjs/typeorm';

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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
```
10. Add base.entity.ts in src/common
```ts
import { PrimaryGeneratedColumn } from 'typeorm';

export abstract class Base {
  // Using string uuid
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // Using big int
  @PrimaryGeneratedColumn('increment', { type: 'bigint' })
  id: number;
}
```
11. To create modules with: dtos, entity, service and controller (select REST API, then generate CRUD entry points)
```
nest g res <name>
``` 
* make name.entity.ts extend Base
* Tag at the start
```ts
@Entity()
```
* fill entity with @Column() or @JoinColumn()
* fill create-name.dto.ts with restrictions
* add in name.module.ts 
```ts 
imports: [TypeOrmModule.forFeature([Name])],
```
* edit name.controller.ts (+id -> id) and name.service.ts (id: number -> id: string)
* add repository connection
```ts
constructor(
  @InjectRepository(Name)
  private readonly nameRepository: Repository<Name>,
) {}
```
* add entity restrictions in name.service.ts
* use async for functions
* use notation for paths:
```ts
// In entity
import { Name } from '../../name/entities/name.entity'
// In controller / service
import { Name } from '../name/entities/name.entity'
```
* if service needs from another repository add in name.module.ts:
```ts
TypeOrmModule.forFeature([Name, ExtraRepositoryEntity, ...])
```

# Run project tests

```bash
# unit tests
$ npm run test
```

# License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
