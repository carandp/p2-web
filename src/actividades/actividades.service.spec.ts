import { Test, TestingModule } from '@nestjs/testing';
import { ActividadesService } from './actividades.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Actividade } from './entities/actividade.entity';
import { Repository } from 'typeorm';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { CreateActividadeDto } from './dto/create-actividade.dto';

const mockActividade = {
  id: 1,
  titulo: 'Actividad de prueba valida',
  estado: 0,
  fecha: '17-05-2025',
  estudiantes: [],
  cupoMaximo: 10,
};

describe('ActividadesService', () => {
  let service: ActividadesService;
  let repository: Repository<Actividade>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ActividadesService,
        {
          provide: getRepositoryToken(Actividade),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<ActividadesService>(ActividadesService);
    repository = module.get<Repository<Actividade>>(getRepositoryToken(Actividade));

    jest.clearAllMocks();
  });

  describe('create', () => {
    it('Caso positivo: crear y guardar actividad valida', async () => {
      const dto: CreateActividadeDto = {
        titulo: 'Actividad valida para prueba',
        estado: 0,
        fecha: '17-05-2025',
        cupoMaximo: 0
      };

      jest.spyOn(repository, 'create').mockReturnValue(dto as any);
      jest.spyOn(repository, 'save').mockResolvedValue(mockActividade as any);

      const result = await service.create(dto);

      expect(result).toEqual(mockActividade);
    });

    it('Caso negativo: titulo contiene caracteres especiales', async () => {
      const dto: CreateActividadeDto = {
        titulo: 'Actividad invalida @$%',
        estado: 0,
        fecha: '17-05-2025',
        cupoMaximo: 0
      };

      await expect(service.create(dto)).rejects.toThrow(
        new BadRequestException('Titulo cant have special characters'),
      );
    });
  });

  describe('updateEstado', () => {
    it('Caso positivo: actualizar estado a 1 si 80% de cupoMaximo se logro', async () => {
      const actividad = {
        ...mockActividade,
        estado: 0,
        estudiantes: new Array(8),
      };

      jest.spyOn(repository, 'findOne').mockResolvedValue(actividad as any);
      jest.spyOn(repository, 'save').mockResolvedValue({
        ...actividad,
        estado: 1,
      } as any);

      const result = await service.updateEstado(1, 1);
      expect(result.estado).toBe(1);
    });

    it('Caso negativo: actividad no puede actualizar a cerrada pues su cupo no esta lleno', async () => {
      const actividad = {
        ...mockActividade,
        estado: 0,
        estudiantes: new Array(5),
      };
      jest.spyOn(repository, 'findOne').mockResolvedValue(actividad as any);
      jest.spyOn(repository, 'save').mockResolvedValue({
        ...actividad,
        estado: 2,
      } as any);
      await expect(service.updateEstado(1, 2)).rejects.toThrow(
        new BadRequestException('Actividade with id 1 is not full'),
      );
    });
  });

  describe('findAllActividadesByDate', () => {
    it('Caso positivo: encuentra todas las actividades con fecha especificada', async () => {
      jest
        .spyOn(repository, 'find')
        .mockResolvedValue([mockActividade] as any);

      const result = await service.findAllActividadesByDate('17-05-2025');
      expect(result).toEqual([mockActividade]);
    });

    it('Caso negativo: no deberia encontrar actividades', async () => {
      jest.spyOn(repository, 'find').mockResolvedValue([]);

      await expect(service.findAllActividadesByDate('01-01-9999')).rejects.toThrow(
        new NotFoundException('No actividades found for date 01-01-9999'),
      );
    });
  });

  describe('findOne', () => {
    it('Caso positivo: deberia encontrar actividad por su id', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValue(mockActividade as any);

      const result = await service.findOne(1);
      expect(result).toEqual(mockActividade);
    });

    it('Caso negativo: no deberia encontrar una actividad', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValue(null);

      await expect(service.findOne(999)).rejects.toThrow(
        new NotFoundException('Actividade with id 999 not found'),
      );
    });
  });
});