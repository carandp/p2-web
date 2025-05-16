import { Test, TestingModule } from '@nestjs/testing';
import { ReseniasService } from './resenias.service';

describe('ReseniasService', () => {
  let service: ReseniasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReseniasService],
    }).compile();

    service = module.get<ReseniasService>(ReseniasService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
