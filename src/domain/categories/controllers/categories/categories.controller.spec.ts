import * as request from 'supertest';

import { HttpStatus, INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

import { CategoriesController } from './categories.controller';
import { CategoriesModule } from '../../categories.module';
import { CategoriesRepository } from '../../repositories';
import { JwtAuthGuard } from 'src/shared/guards';

describe('CategoriesController', () => {
  let app: INestApplication;

  let controller: CategoriesController;
  let repository: CategoriesRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [CategoriesModule],
    })
      .overrideGuard(JwtAuthGuard)
      .useValue({
        canActivate: () => true,
      })
      .compile();

    controller = module.get<CategoriesController>(CategoriesController);
    repository = module.get<CategoriesRepository>(CategoriesRepository);

    app = module.createNestApplication();
    await app.init();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create new category', async () => {
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

    await request(app.getHttpServer())
      .post('/categories')
      .send(data)
      .expect(HttpStatus.CREATED)
      .expect({
        id: 1,
        name: data.name,
        description: data.description,
        userId,
      });
  });
});
