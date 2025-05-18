import { Test, TestingModule } from '@nestjs/testing';
import { ReseniasService } from './resenias.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Resenia } from './entities/resenia.entity';
import { Estudiante } from '../estudiantes/entities/estudiante.entity';
import { Actividade } from '../actividades/entities/actividade.entity';
import { Repository } from 'typeorm';
import { BadRequestException, NotFoundException } from '@nestjs/common';

describe('ReseniasService', () => {
  let service: ReseniasService;
  let reseniaRepo: Repository<Resenia>;
  let estudianteRepo: Repository<Estudiante>;
  let actividadRepo: Repository<Actividade>;

  const mockEstudiante = {
    id: 1,
    cedula: 1234567890,
    nombre: 'Carlos Peña',
    correo: 'carlos@gmail.com',
    programa: 'Ing. Sistemas',
    semestre: 6,
    actividades: [{ id: 1 }],
    resenias: [],
  };

  const mockActividade = {
    id: 1,
    titulo: 'Actividad de prueba valida',
    estado: 2,
    fecha: '17-05-2025',
    estudiantes: [],
    cupoMaximo: 10,
  };

  const mockResenia = {
    id: 1,
    comentario: 'Muy buena',
    calificacion: 5,
    fecha: '17-05-2025',
    estudiante: mockEstudiante,
    actividade: mockActividade,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ReseniasService,
        {
          provide: getRepositoryToken(Resenia),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(Estudiante),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(Actividade),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<ReseniasService>(ReseniasService);
    reseniaRepo = module.get<Repository<Resenia>>(getRepositoryToken(Resenia));
    estudianteRepo = module.get<Repository<Estudiante>>(getRepositoryToken(Estudiante));
    actividadRepo = module.get<Repository<Actividade>>(getRepositoryToken(Actividade));

    jest.clearAllMocks();
  });

  describe('agregarReseña', () => {
    it('Caso positivo: crear y guardar resenia valida', async () => {
      const dto = { comentario: 'Muy buena', calificacion: 5, fecha: '17-05-2025', estudiante: 1, actividade: 1 };

      jest.spyOn(actividadRepo, 'findOne').mockResolvedValue(mockActividade as any);
      jest.spyOn(estudianteRepo, 'findOne').mockResolvedValue(mockEstudiante as any);
      jest.spyOn(reseniaRepo, 'create').mockReturnValue(mockResenia as any);
      jest.spyOn(reseniaRepo, 'save').mockResolvedValue(mockResenia as any);

      const result = await service.agregarReseña(dto);
      expect(result).toEqual(mockResenia);
    });

    it('Caso negativo: resenia invalida pues actividad no tiene estado finalizado (2)', async () => {
      const dto = { comentario: 'Muy buena', calificacion: 5, fecha: '17-05-2025', estudiante: 1, actividade: 1 };

      const actividadEstadoInvalido = { ...mockActividade, estado: 1 };

      jest.spyOn(actividadRepo, 'findOne').mockResolvedValue(actividadEstadoInvalido as any);

      await expect(service.agregarReseña(dto)).rejects.toThrow(
        new BadRequestException('Actividade is not in the correct estado'),
      );
    });
  });

  describe('findReseñaById', () => {
    it('Caso positivo: deberia encontrar la resenia dado un id', async () => {
      jest.spyOn(reseniaRepo, 'findOne').mockResolvedValue(mockResenia as any);

      const result = await service.findReseñaById(1);
      expect(result).toEqual(mockResenia);
    });

    it('Caso negativo: no deberia encontrar una resenia invalida', async () => {
      jest.spyOn(reseniaRepo, 'findOne').mockResolvedValue(null);

      await expect(service.findReseñaById(999)).rejects.toThrow(
        new NotFoundException('Resenia with id 999 not found'),
      );
    });
  });
});
