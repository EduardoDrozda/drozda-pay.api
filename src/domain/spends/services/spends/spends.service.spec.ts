import { Test, TestingModule } from '@nestjs/testing';

import { SpendsModule } from '../../spends.module';
import { SpendsRepository } from '../../repositories';
import { SpendsService } from './spends.service';

describe('SpendsService', () => {
  let service: SpendsService;
  let repository: SpendsRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [SpendsModule],
    }).compile();

    service = module.get<SpendsService>(SpendsService);
    repository = module.get<SpendsRepository>(SpendsRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should be able to create a spend', async () => {
    const spend: any = {
      name: 'Spend 1',
      description: 'Spend 1 description',
      amount: 100,
      categoryId: 1,
      userId: 1,
    };

    jest.spyOn(repository, 'create').mockResolvedValue({
      id: 1,
      ...spend,
    });

    await service.create(spend);

    expect(repository.create).toBeCalled();
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

    jest.spyOn(repository, 'findAll').mockResolvedValue(spends);

    await service.findAll(1);

    expect(repository.findAll).toBeCalled();
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

    jest.spyOn(repository, 'findById').mockResolvedValue(spend);

    await service.findById(1, 1);

    expect(repository.findById).toBeCalled();
  });

  it('should be able throw an error if spend not found', async () => {
    jest.spyOn(repository, 'findById').mockResolvedValue(null);

    await expect(service.findById(1, 1)).rejects.toThrowError(
      'Spend not found',
    );
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

    jest.spyOn(repository, 'findById').mockResolvedValue(spend);
    jest.spyOn(repository, 'update').mockResolvedValue(spend);

    await service.update(1, 1, spend);

    expect(repository.update).toBeCalled();
  });

  it('should be able to delete a spend', async () => {
    const spend: any = {
      id: 1,
      name: 'Spend 1',
      description: 'Spend 1 description',
      amount: 100,
      categoryId: 1,
      userId: 1,
    };

    jest.spyOn(repository, 'findById').mockResolvedValue(spend);
    jest.spyOn(repository, 'delete').mockResolvedValue(null);

    await service.delete(1, 1);

    expect(repository.delete).toBeCalled();
  });
});
