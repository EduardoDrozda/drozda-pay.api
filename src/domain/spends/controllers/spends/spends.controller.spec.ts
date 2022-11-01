import { Test, TestingModule } from '@nestjs/testing';
import { SpendsController } from './spends.controller';

describe('SpendsController', () => {
  let controller: SpendsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SpendsController],
    }).compile();

    controller = module.get<SpendsController>(SpendsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
