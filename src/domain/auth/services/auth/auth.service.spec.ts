import { Test, TestingModule } from '@nestjs/testing';
import { UserModule, UserService } from 'src/domain/user';

import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';

describe('AuthService', () => {
  let service: AuthService;
  let userService: UserService;

  const MOCK_USER = {
    id: 1,
    email: 'dummy@email.com',
    name: 'Dummy User',
    password: '$2a$10$R.ZgnOUHbSqJ5Ac8d9Ke2.bygCqcUi9aE51TyYuqWn1TFJigmNbfS',
  };

  const MOCK_TOKEN =
    'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImVtYWlsQGVtYWlsLmNvbSIsInN1YiI6MSwiaWF0IjoxNjY2OTk4OTk5LCJleHAiOjE2NjcwODUzOTl9.zW23jvMMaLUC65mGiXn2SkIp0oYOCIq9JNY_--4du4I';

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [JwtModule, UserModule],
      providers: [AuthService],
    }).compile();

    service = module.get<AuthService>(AuthService);
    userService = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return a token', async () => {
    jest.spyOn(userService, 'findByEmail').mockResolvedValue(MOCK_USER);

    const token = await service.login({
      email: MOCK_USER.email,
      password: 'secret',
    });

    expect(token).toBeDefined();
    expect(token.token).toBeDefined();
    expect(token.type).toBeDefined();
    expect(token.expiresIn).toBeDefined();

    expect(token.token).toEqual(expect.any(String));
    expect(token.type).toEqual(expect.any(String));
    expect(token.expiresIn).toEqual(expect.any(String));

    expect(userService.findByEmail).toBeCalledTimes(1);
  });

  it('should throw an error when user not found', async () => {
    jest.spyOn(userService, 'findByEmail').mockResolvedValue(null);

    await expect(
      service.login({
        email: MOCK_USER.email,
        password: 'secret',
      }),
    ).rejects.toThrow();

    expect(userService.findByEmail).toBeCalledTimes(1);
  });

  it('should throw an error when password is invalid', async () => {
    jest.spyOn(userService, 'findByEmail').mockResolvedValue(MOCK_USER);

    await expect(
      service.login({
        email: MOCK_USER.email,
        password: 'invalid',
      }),
    ).rejects.toThrow();

    expect(userService.findByEmail).toBeCalledTimes(1);
  });

  it('should return a logged user', async () => {
    jest.spyOn(userService, 'findByEmail').mockResolvedValue(MOCK_USER);

    const token =
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImVtYWlsQGVtYWlsLmNvbSIsInN1YiI6MSwiaWF0IjoxNjY2OTk4OTk5LCJleHAiOjE2NjcwODUzOTl9.zW23jvMMaLUC65mGiXn2SkIp0oYOCIq9JNY_--4du4I';
    const user = await service.getLoggedUser(MOCK_TOKEN);

    expect(user).toBeDefined();
    expect(user.id).toBeDefined();
    expect(user.name).toBeDefined();
    expect(user.email).toBeDefined();

    expect(user.id).toEqual(expect.any(Number));
    expect(user.name).toEqual(expect.any(String));
    expect(user.email).toEqual(expect.any(String));

    expect(userService.findByEmail).toBeCalledTimes(1);
  });

  it('should throw an error when token is invalid', async () => {
    jest.spyOn(userService, 'findByEmail').mockResolvedValue(null);

    await expect(service.getLoggedUser(MOCK_TOKEN)).rejects.toThrow();
    expect(userService.findByEmail).toBeCalledTimes(1);
  });
});
