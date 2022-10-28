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
});
