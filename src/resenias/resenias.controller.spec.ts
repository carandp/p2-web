import { Test, TestingModule } from '@nestjs/testing';
import { ReseniasController } from './resenias.controller';
import { ReseniasService } from './resenias.service';

describe('ReseniasController', () => {
  let controller: ReseniasController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReseniasController],
      providers: [ReseniasService],
    }).compile();

    controller = module.get<ReseniasController>(ReseniasController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
