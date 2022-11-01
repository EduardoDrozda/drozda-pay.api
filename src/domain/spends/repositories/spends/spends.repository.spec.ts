import { Test, TestingModule } from '@nestjs/testing';

import { SpendsRepository } from './spends.repostiory';

describe('SpendsRepository', () => {
  let service: SpendsRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SpendsRepository],
    }).compile();

    service = module.get<SpendsRepository>(SpendsRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
