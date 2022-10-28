import { Test, TestingModule } from '@nestjs/testing';

import { UserRepository } from '../../repositories';
import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;
  let repository: UserRepository;

  const MOCK_USER = {
    name: 'John Doe',
    email: 'dummy@email.com',
    password: 'secret',
    confirmPassword: 'secret',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService, UserRepository],
    }).compile();

    service = module.get<UserService>(UserService);
    repository = module.get<UserRepository>(UserRepository);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create new user', async () => {
    jest.spyOn(repository, 'findByEmail').mockResolvedValue(null);
    jest.spyOn(repository, 'create').mockResolvedValue(
      new Promise((resolve) =>
        resolve({
          id: 1,
          email: MOCK_USER.email,
          name: MOCK_USER.name,
          password:
            '$2a$10$xzgEkzHC/iswCSZc1Ej1XuDutgygt6HIwB1D5PTX.bvEVjpDwfMz.',
        }),
      ),
    );

    const newUser = await service.create(MOCK_USER);

    expect(repository.create).toBeCalledWith({
      name: MOCK_USER.name,
      email: MOCK_USER.email,
      password: MOCK_USER.password,
    });

    expect(repository.create).toBeCalledTimes(1);
    expect(repository.findByEmail).toBeCalledWith(MOCK_USER.email);
    expect(repository.findByEmail).toBeCalledTimes(1);

    expect(newUser).toHaveProperty('email');
    expect(newUser).toHaveProperty('name');
  });

  it('should throw error when user already exists', async () => {
    jest.spyOn(repository, 'findByEmail').mockResolvedValue({
      id: 1,
      email: MOCK_USER.email,
      name: MOCK_USER.name,
      password: MOCK_USER.password,
    });

    await expect(service.create(MOCK_USER)).rejects.toThrowError();
  });
});
