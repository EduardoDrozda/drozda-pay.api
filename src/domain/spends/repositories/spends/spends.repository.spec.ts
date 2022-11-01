import { Test, TestingModule } from '@nestjs/testing';

import { SpendsModule } from '../../spends.module';
import { SpendsRepository } from './spends.repostiory';

describe('SpendsRepository', () => {
  let repository: SpendsRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [SpendsModule],
    }).compile();

    repository = module.get<SpendsRepository>(SpendsRepository);
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
  });

  it('should be able to create a spend', async () => {
    const spend: any = {
      name: 'Spend 1',
      description: 'Spend 1 description',
      amount: 100,
      categoryId: 1,
      userId: 1,
    };

    jest.spyOn(repository.spend, 'create').mockResolvedValue({
      id: 1,
      ...spend,
    });

    await repository.create(spend);

    expect(repository.spend.create).toBeCalled();
  });

  it('should be able to find all spends', async () => {
    const spends: any[] = [
      {
        id: 1,
        name: 'Spend 1',
        description: 'Spend 1 description',
        amount: 100,
        categoryId: 1,
        userId: 1,
      },
    ];

    jest.spyOn(repository.spend, 'findMany').mockResolvedValue(spends);

    await repository.findAll(1);

    expect(repository.spend.findMany).toBeCalled();
  });

  it('should be able to find a spend by id', async () => {
    const spend: any = {
      id: 1,
      name: 'Spend 1',
      description: 'Spend 1 description',
      amount: 100,
      categoryId: 1,
      userId: 1,
    };

    jest.spyOn(repository.spend, 'findFirst').mockResolvedValue(spend);

    await repository.findById(1, 1);

    expect(repository.spend.findFirst).toBeCalled();
  });

  it('should be able to update a spend', async () => {
    const spend: any = {
      id: 1,
      name: 'Spend 1',
      description: 'Spend 1 description',
      amount: 100,
      categoryId: 1,
      userId: 1,
    };

    jest.spyOn(repository.spend, 'update').mockResolvedValue(spend);

    await repository.update(1, spend);

    expect(repository.spend.update).toBeCalled();
  });

  it('should be able to delete a spend', async () => {
    jest.spyOn(repository.spend, 'delete').mockResolvedValue(null);

    await repository.delete(1);

    expect(repository.spend.delete).toBeCalled();
  });
});
