import { Test, TestingModule } from '@nestjs/testing';
import { EstudiantesService } from './estudiantes.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Estudiante } from './entities/estudiante.entity';
import { Actividade } from '../actividades/entities/actividade.entity';
import { Repository } from 'typeorm';
import { BadRequestException, NotFoundException } from '@nestjs/common';

describe('EstudiantesService', () => {
  let service: EstudiantesService;
  let estudianteRepo: Repository<Estudiante>;
  let actividadRepo: Repository<Actividade>;

  const mockEstudiante = {
    id: 1,
    cedula: 1234567890,
    nombre: 'Carlos Peña',
    correo: 'carlos@gmail.com',
    programa: 'Ing. Sistemas',
    semestre: 6,
    actividades: [],
    resenias: [],
  };

  const mockActividad = {
    id: 1,
    titulo: 'Actividad válida',
    fecha: '17-05-2025',
    cupoMaximo: 5,
    estado: 0,
    estudiantes: [],
    resenias: [],
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EstudiantesService,
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

    service = module.get<EstudiantesService>(EstudiantesService);
    estudianteRepo = module.get<Repository<Estudiante>>(getRepositoryToken(Estudiante));
    actividadRepo = module.get<Repository<Actividade>>(getRepositoryToken(Actividade));

    jest.clearAllMocks();
  });

  describe('crearEstudiante', () => {
    it('Caso positivo: crear y guardar estudiante valido', async () => {
      const dto = { nombre: 'Carlos Peña', correo: 'carlos@gmail.com', semestre: 6, cedula: 1234567890, programa: 'Ing. Sistemas' };

      jest.spyOn(estudianteRepo, 'create').mockReturnValue(dto as any);
      jest.spyOn(estudianteRepo, 'save').mockResolvedValue(mockEstudiante as any);

      const result = await service.crearEstudiante(dto);
      expect(result).toEqual(mockEstudiante);
    });

    it('Caso negativo: estudiante invalido por correo', async () => {
      const dto = { nombre: 'Carlos Peña', correo: 'carlosgmail.com', semestre: 6, cedula: 1234567890, programa: 'Ing. Sistemas' };

      await expect(service.crearEstudiante(dto)).rejects.toThrow(
        new BadRequestException('Correo must be valid'),
      );
    });
  });

  describe('findEstudianteById', () => {
    it('Caso positivo: encontrar estudiante por id', async () => {
      jest.spyOn(estudianteRepo, 'findOne').mockResolvedValue(mockEstudiante as any);

      const result = await service.findEstudianteById(1);
      expect(result).toEqual(mockEstudiante);
    });

    it('Caso negativo: no existe estudiante', async () => {
      jest.spyOn(estudianteRepo, 'findOne').mockResolvedValue(null);

      await expect(service.findEstudianteById(999)).rejects.toThrow(
        new NotFoundException('Estudiante with id 999 not found'),
      );
    });
  });

  describe('inscribirseActividad', () => {
    it('Caso positivo: se puede inscribir estudiante en actividad', async () => {
      const estudiante = { ...mockEstudiante, actividades: [] };
      const actividad = { ...mockActividad, estudiantes: [] };

      jest.spyOn(estudianteRepo, 'findOne').mockResolvedValue(estudiante as any);
      jest.spyOn(actividadRepo, 'findOne').mockResolvedValue(actividad as any);
      jest.spyOn(estudianteRepo, 'save').mockResolvedValue({
        ...estudiante,
        actividades: [actividad],
      } as any);

      const result = await service.inscribirseActividad(1, 1);
      expect(result.actividades).toContainEqual(actividad);
    });

    it('Caso negativo: la actividad esta llena', async () => {
      const estudiante = { ...mockEstudiante, actividades: [] };
      const actividad = {
        ...mockActividad,
        estudiantes: new Array(5),
      };

      jest.spyOn(estudianteRepo, 'findOne').mockResolvedValue(estudiante as any);
      jest.spyOn(actividadRepo, 'findOne').mockResolvedValue(actividad as any);

      await expect(service.inscribirseActividad(1, 1)).rejects.toThrow(
        new BadRequestException('Actividad with id 1 is full'),
      );
    });
  });
});
