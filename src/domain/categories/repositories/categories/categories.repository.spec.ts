import { Test, TestingModule } from '@nestjs/testing';

import { CategoriesRepository } from './categories.repository';

describe('CategoriesRepository', () => {
  let repository: CategoriesRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CategoriesRepository],
    }).compile();

    repository = module.get<CategoriesRepository>(CategoriesRepository);
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
  });

  it('should create a category', async () => {
    const userId = 1;
    const data = {
      name: 'Entradas',
      description: 'Categoria para valores que somam no saldo final',
      userId,
    };

    jest.spyOn(repository.category, 'create').mockResolvedValue({
      id: 1,
      name: 'Entradas',
      description: 'Categoria para valores que somam no saldo final',
      userId,
    });

    await repository.create(data);
    expect(repository.category.create).toHaveBeenCalled();
    expect(repository.category.create).toHaveBeenCalledWith({
      data: {
        ...data,
      },
    });
  });
});
