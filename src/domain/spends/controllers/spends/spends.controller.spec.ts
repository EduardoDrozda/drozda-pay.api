import * as request from 'supertest';

import { HttpStatus, INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

import { JwtAuthGuard } from 'src/shared/guards';
import { SpendsController } from './spends.controller';
import { SpendsModule } from '../../spends.module';
import { SpendsRepository } from '../../repositories';

describe('SpendsController', () => {
  let app: INestApplication;

  let controller: SpendsController;
  let repository: SpendsRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [SpendsModule],
    })
      .overrideGuard(JwtAuthGuard)
      .useValue({
        canActivate: () => true,
      })
      .compile();

    controller = module.get<SpendsController>(SpendsController);
    repository = module.get<SpendsRepository>(SpendsRepository);

    app = module.createNestApplication();
    await app.init();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create new spend', async () => {
    const userId = 1;

    const data: any = {
      name: 'Spend 1',
      description: 'Spend 1 description',
      amount: 100,
      categoryId: 1,
      userId,
    };

    jest.spyOn(repository, 'create').mockImplementation(async () => {
      return {
        id: 1,
        ...data,
      };
    });

    await request(app.getHttpServer())
      .post('/spends')
      .send(data)
      .expect(HttpStatus.CREATED);

    expect(repository.create).toBeCalled();
  });

  it('should return all spends', async () => {
    const data: any = {
      name: 'Spend 1',
      description: 'Spend 1 description',
      amount: 100,
    };

    jest.spyOn(repository, 'findAll').mockImplementation(async () => {
      return [
        {
          id: 1,
          ...data,
        },
      ];
    });

    await request(app.getHttpServer())
      .get('/spends')
      .expect(HttpStatus.OK)
      .expect([
        {
          id: 1,
          ...data,
        },
      ]);

    expect(repository.findAll).toBeCalled();
  });

  it('should return spend by id', async () => {
    const data: any = {
      name: 'Spend 1',
      description: 'Spend 1 description',
      amount: 100,
    };

    jest.spyOn(repository, 'findById').mockImplementation(async () => {
      return {
        ...data,
      };
    });

    await request(app.getHttpServer())
      .get('/spends/1')
      .expect(HttpStatus.OK)
      .expect({
        ...data,
      });

    expect(repository.findById).toBeCalled();
  });

  it('should throw error when spend not found', async () => {
    jest.spyOn(repository, 'findById').mockImplementation(async () => {
      return null;
    });

    await request(app.getHttpServer())
      .get('/spends/1')
      .expect(HttpStatus.NOT_FOUND);

    expect(repository.findById).toBeCalled();
  });

  it('should update spend', async () => {
    const data: any = {
      name: 'Spend 1',
      description: 'Spend 1 description',
      amount: 100,
    };

    jest.spyOn(repository, 'findById').mockResolvedValue(data);

    jest.spyOn(repository, 'update').mockImplementation(async () => {
      return {
        ...data,
      };
    });

    await request(app.getHttpServer())
      .put('/spends/1')
      .send(data)
      .expect(HttpStatus.OK)
      .expect({
        ...data,
      });

    expect(repository.findById).toBeCalled();
    expect(repository.update).toBeCalled();
  });

  it('should delete spend', async () => {
    const data: any = {
      id: 1,
      name: 'Spend 1',
      description: 'Spend 1 description',
      amount: 100,
      categoryId: 1,
      userId: 1,
    };

    jest.spyOn(repository, 'findById').mockResolvedValue(data);
    jest.spyOn(repository, 'delete').mockResolvedValue(null);

    await request(app.getHttpServer())
      .delete('/spends/1')
      .expect(HttpStatus.NO_CONTENT);

    expect(repository.delete).toBeCalled();
  });
});
