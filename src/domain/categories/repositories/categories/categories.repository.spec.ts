import { Test, TestingModule } from '@nestjs/testing';

import { CategoriesRepository } from './categories.repository';

describe('CategoriesRepository', () => {
  let service: CategoriesRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CategoriesRepository],
    }).compile();

    service = module.get<CategoriesRepository>(CategoriesRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
