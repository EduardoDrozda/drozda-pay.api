import { Test, TestingModule } from '@nestjs/testing';

import { CategoriesModule } from '../../categories.module';
import { CategoriesRepository } from '../../repositories';
import { CategoriesService } from './categories.service';

describe('CategoriesService', () => {
  let service: CategoriesService;
  let repository: CategoriesRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [CategoriesModule],
    }).compile();

    service = module.get<CategoriesService>(CategoriesService);
    repository = module.get<CategoriesRepository>(CategoriesRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create default categories', async () => {
    const userId = 1;

    jest.spyOn(repository, 'create').mockImplementation(async () => {
      return {
        id: 1,
        name: 'Entradas',
        description: 'Categoria para valores que somam no saldo final',
        userId,
      };
    });

    await service.createDefaultCategories(userId);
    expect(repository.create).toHaveBeenCalledTimes(3);
  });

  it('should create a category', async () => {
    const userId = 1;
    const data = {
      name: 'Entradas',
      description: 'Categoria para valores que somam no saldo final',
      userId,
    };

    jest.spyOn(repository, 'create').mockImplementation(async () => {
      return {
        id: 1,
        name: 'Entradas',
        description: 'Categoria para valores que somam no saldo final',
        userId,
      };
    });

    await service.create(data);
    expect(repository.create).toHaveBeenCalled();
  });

  it('should update a category', async () => {
    const userId = 1;
    const data = {
      name: 'Entradas',
      description: 'Categoria para valores que somam no saldo final',
      userId,
    };

    jest.spyOn(repository, 'update').mockImplementation(async () => {
      return {
        id: 1,
        name: 'Entradas',
        description: 'Categoria para valores que somam no saldo final',
        userId,
      };
    });

    await service.update(1, 1, data);
    expect(repository.update).toHaveBeenCalled();
  });

  it('should get all categories', async () => {
    const userId = 1;

    jest.spyOn(repository, 'findAllByUserId').mockImplementation(async () => {
      return [
        {
          id: 1,
          name: 'Entradas',
          description: 'Categoria para valores que somam no saldo final',
          userId,
        },
      ];
    });

    await service.findAllByUserId(userId);
    expect(repository.findAllByUserId).toHaveBeenCalled();
  });

  it('should get a category by id', async () => {
    const userId = 1;

    jest.spyOn(repository, 'findById').mockImplementation(async () => {
      return {
        id: 1,
        name: 'Entradas',
        description: 'Categoria para valores que somam no saldo final',
        userId,
      };
    });

    await service.findById(userId, 1);
    expect(repository.findById).toHaveBeenCalled();
  });

  it('should delete a category', async () => {
    const userId = 1;

    jest.spyOn(repository, 'delete').mockImplementation(async () => {
      return {
        id: 1,
        name: 'Entradas',
        description: 'Categoria para valores que somam no saldo final',
        userId,
      };
    });

    await service.delete(userId, 1);
    expect(repository.delete).toHaveBeenCalled();
  });
});
