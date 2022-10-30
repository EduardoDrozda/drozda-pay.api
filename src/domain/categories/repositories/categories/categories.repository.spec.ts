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

  it('should return all categories', async () => {
    const userId = 1;

    jest.spyOn(repository.category, 'findMany').mockResolvedValue([
      {
        id: 1,
        name: 'Entradas',
        description: 'Categoria para valores que somam no saldo final',
        userId,
      },
    ]);

    await repository.findAllByUserId(userId);
    expect(repository.category.findMany).toHaveBeenCalled();
    expect(repository.category.findMany).toHaveBeenCalledWith({
      where: {
        userId,
      },
    });
  });

  it('should return a category by id', async () => {
    const id = 1;
    const userId = 1;

    jest.spyOn(repository.category, 'findFirst').mockResolvedValue({
      id,
      name: 'Entradas',
      description: 'Categoria para valores que somam no saldo final',
      userId,
    });

    await repository.findById(id, userId);
    expect(repository.category.findFirst).toHaveBeenCalled();
    expect(repository.category.findFirst).toHaveBeenCalledWith({
      where: {
        id,
        userId,
      },
    });
  });

  it('should update a category', async () => {
    const id = 1;
    const userId = 1;
    const data = {
      name: 'Entradas',
      description: 'Categoria para valores que somam no saldo final',
      userId,
    };

    jest.spyOn(repository.category, 'update').mockResolvedValue({
      id,
      name: 'Entradas',
      description: 'Categoria para valores que somam no saldo final',
      userId,
    });

    await repository.update(id, data);
    expect(repository.category.update).toHaveBeenCalled();
    expect(repository.category.update).toHaveBeenCalledWith({
      where: {
        id,
      },
      data,
    });
  });

  it('should delete a category', async () => {
    const id = 1;

    jest.spyOn(repository.category, 'delete').mockResolvedValue(null);

    await repository.delete(id);
    expect(repository.category.delete).toHaveBeenCalled();
    expect(repository.category.delete).toHaveBeenCalledWith({
      where: {
        id,
      },
    });
  });
});
