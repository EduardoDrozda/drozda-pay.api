import * as request from 'supertest';

import { HttpStatus, INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

import { AuthController } from './auth.controller';
import { AuthModule } from '../../auth.module';
import { JwtAuthGuard } from 'src/shared/guards';
import { UserRepository } from 'src/domain/user';

describe('AuthController', () => {
  let app: INestApplication;

  let controller: AuthController;
  let userRepository: UserRepository;

  const MOCK_USER = {
    id: 1,
    email: 'email@email.com',
    name: 'Dummy User',
    password: '$2a$10$xzgEkzHC/iswCSZc1Ej1XuDutgygt6HIwB1D5PTX.bvEVjpDwfMz.',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AuthModule],
      providers: [],
    })
      .overrideGuard(JwtAuthGuard)
      .useValue({
        canActivate: () => true,
      })
      .compile();

    controller = module.get<AuthController>(AuthController);
    userRepository = module.get<UserRepository>(UserRepository);

    app = module.createNestApplication();
    await app.init();
  });

  afterEach(async () => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return a token', async () => {
    jest.spyOn(userRepository.user, 'findUnique').mockResolvedValue({
      id: 1,
      email: MOCK_USER.email,
      name: MOCK_USER.name,
      password: MOCK_USER.password,
    });

    const { body } = await request(app.getHttpServer())
      .post('/login')
      .send({
        email: MOCK_USER.email,
        password: 'secret',
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(HttpStatus.CREATED);

    expect(body).toHaveProperty('token');
    expect(body).toHaveProperty('type');
    expect(body).toHaveProperty('expiresIn');

    expect(userRepository.user.findUnique).toBeCalledWith({
      where: {
        email: MOCK_USER.email,
      },
    });

    expect(userRepository.user.findUnique).toBeCalledTimes(1);
  });

  it('should return a 401 error', async () => {
    jest.spyOn(userRepository.user, 'findUnique').mockResolvedValue(null);

    const { body } = await request(app.getHttpServer())
      .post('/login')
      .send({
        email: MOCK_USER.email,
        password: 'secret',
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(HttpStatus.UNAUTHORIZED);

    expect(body).toHaveProperty('statusCode');
    expect(body).toHaveProperty('message');
    expect(body).toHaveProperty('error');

    expect(userRepository.user.findUnique).toBeCalledWith({
      where: {
        email: MOCK_USER.email,
      },
    });

    expect(userRepository.user.findUnique).toBeCalledTimes(1);
  });

  it('should get logged user', async () => {
    jest.spyOn(userRepository.user, 'findUnique').mockResolvedValue({
      id: 1,
      email: MOCK_USER.email,
      name: MOCK_USER.name,
      password: MOCK_USER.password,
    });

    const headers = {
      Accept: 'application/json',
      authorization:
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImVtYWlsQGVtYWlsLmNvbSIsInN1YiI6MSwiaWF0IjoxNjY2OTk4OTk5LCJleHAiOjE2NjcwODUzOTl9.zW23jvMMaLUC65mGiXn2SkIp0oYOCIq9JNY_--4du4I',
    };

    const { body } = await request(app.getHttpServer())
      .get('/me')
      .set(headers)
      .expect('Content-Type', /json/)
      .expect(HttpStatus.OK);

    expect(body).toHaveProperty('id');
    expect(body).toHaveProperty('email');
    expect(body).toHaveProperty('name');
  });
});
