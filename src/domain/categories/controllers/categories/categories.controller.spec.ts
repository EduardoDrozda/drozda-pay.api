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
      });
  });

  it('should return all categories', async () => {
    const userId = 1;

    const data = [
      {
        id: 1,
        name: 'Entradas',
        description: 'Categoria para valores que somam no saldo final',
        userId,
      },
      {
        id: 2,
        name: 'Saídas',
        description: 'Categoria para valores que subtraem no saldo final',
        userId,
      },
    ];

    jest.spyOn(repository, 'findAllByUserId').mockImplementation(async () => {
      return data;
    });

    const result = await request(app.getHttpServer())
      .get('/categories')
      .expect(HttpStatus.OK)
      .expect('Content-Type', /json/);

    expect(repository.findAllByUserId).toHaveBeenCalledTimes(1);
    expect(result.body.length).toEqual(2);
  });

  it('should return category by id', async () => {
    const userId = 1;

    const data = {
      id: 1,
      name: 'Entradas',
      description: 'Categoria para valores que somam no saldo final',
      userId,
    };

    jest.spyOn(repository, 'findById').mockImplementation(async () => {
      return data;
    });

    const result = await request(app.getHttpServer())
      .get(`/categories/${data.id}`)
      .expect(HttpStatus.OK)
      .expect('Content-Type', /json/);

    expect(repository.findById).toHaveBeenCalledTimes(1);
    expect(result.body).toEqual(data);
  });

  it('should throw error when category not found', async () => {
    const userId = 1;

    const data = {
      id: 1,
      name: 'Entradas',
      description: 'Categoria para valores que somam no saldo final',
      userId,
    };

    jest.spyOn(repository, 'findById').mockImplementation(async () => {
      return null;
    });

    await request(app.getHttpServer())
      .get(`/categories/${data.id}`)
      .expect(HttpStatus.NOT_FOUND);
  });

  it('should update category', async () => {
    const userId = 1;

    const data = {
      id: 1,
      name: 'Entradas',
      description: 'Categoria para valores que somam no saldo final',
      userId,
    };

    jest.spyOn(repository, 'findById').mockImplementation(async () => {
      return data;
    });

    jest.spyOn(repository, 'update').mockImplementation(async () => {
      return data;
    });

    await request(app.getHttpServer())
      .put(`/categories/${data.id}`)
      .send(data)
      .expect(HttpStatus.OK);

    expect(repository.update).toHaveBeenCalledTimes(1);
  });

  it('should delete category', async () => {
    const userId = 1;

    const data = {
      id: 1,
      name: 'Entradas',
      description: 'Categoria para valores que somam no saldo final',
      userId,
    };

    jest.spyOn(repository, 'findById').mockImplementation(async () => {
      return data;
    });

    jest.spyOn(repository, 'delete').mockImplementation(async () => {
      return data;
    });

    await request(app.getHttpServer())
      .delete(`/categories/${data.id}`)
      .expect(HttpStatus.NO_CONTENT);

    expect(repository.delete).toHaveBeenCalledTimes(1);
  });
});
