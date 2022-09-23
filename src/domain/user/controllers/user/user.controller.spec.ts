import * as request from 'supertest';

import { HttpStatus, INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

import { UserController } from './user.controller';
import { UserRepository } from '../../repositories';
import { UserService } from '../../services';

describe('UserController', () => {
  let app: INestApplication;

  let controller: UserController;
  let repository: UserRepository;

  const MOCK_USER = {
    name: 'John Doe',
    email: 'dummy@email.com',
    password: 'secret',
    confirmPassword: 'secret',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService, UserRepository],
    }).compile();

    controller = module.get<UserController>(UserController);
    repository = module.get<UserRepository>(UserRepository);

    app = module.createNestApplication();
    await app.init();
  });

  afterEach(async () => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('/POST user', async () => {
    jest.spyOn(repository.user, 'findUnique').mockResolvedValue(null);

    jest.spyOn(repository.user, 'create').mockResolvedValue({
      id: 1,
      email: MOCK_USER.email,
      name: MOCK_USER.name,
      password: MOCK_USER.password,
    });

    await request(app.getHttpServer())
      .post('/users')
      .send(MOCK_USER)
      .expect(HttpStatus.CREATED)
      .expect({
        email: MOCK_USER.email,
        name: MOCK_USER.name,
      });

    expect(repository.user.create).toBeCalledWith({
      data: {
        name: MOCK_USER.name,
        email: MOCK_USER.email,
        password: MOCK_USER.password,
      },
    });

    expect(repository.user.create).toBeCalledTimes(1);

    expect(repository.user.findUnique).toBeCalledWith({
      where: {
        email: MOCK_USER.email,
      },
    });

    expect(repository.user.findUnique).toBeCalledTimes(1);
  });

  it('/POST user with existing email must return 422 status', async () => {
    jest.spyOn(repository.user, 'findUnique').mockResolvedValue({
      id: 1,
      email: MOCK_USER.email,
      name: MOCK_USER.name,
      password: MOCK_USER.password,
    });

    await request(app.getHttpServer())
      .post('/users')
      .send(MOCK_USER)
      .expect(HttpStatus.UNPROCESSABLE_ENTITY)
      .expect({
        statusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        message: 'User already exists',
        error: 'Unprocessable Entity',
      });

    expect(repository.user.findUnique).toBeCalledWith({
      where: {
        email: MOCK_USER.email,
      },
    });

    expect(repository.user.findUnique).toBeCalledTimes(1);
  });
});
