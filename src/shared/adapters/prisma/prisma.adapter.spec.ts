import { Test, TestingModule } from '@nestjs/testing';

import { PrismaAdapter } from './prisma.adapter';

describe('PrismaAdapter', () => {
  let adapter: PrismaAdapter;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PrismaAdapter],
    }).compile();

    adapter = module.get<PrismaAdapter>(PrismaAdapter);
  });

  it('should be defined', () => {
    expect(adapter).toBeDefined();
  });
});
