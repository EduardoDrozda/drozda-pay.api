import * as request from 'supertest';

import { HttpStatus, INestApplication } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { UserModule, UserRepository, UserService } from 'src/domain/user';

import { AuthController } from './auth.controller';
import { AuthModule } from '../../auth.module';

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
    }).compile();

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
});
