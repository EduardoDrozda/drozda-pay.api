import { Test, TestingModule } from '@nestjs/testing';
import { SpendsService } from './spends.service';

describe('SpendsService', () => {
  let service: SpendsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SpendsService],
    }).compile();

    service = module.get<SpendsService>(SpendsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
