import { Test, TestingModule } from '@nestjs/testing';

import { UserRepository } from './user.repository';

describe('UserRepository', () => {
  let repository: UserRepository;

  const MOCK_USER = {
    name: 'John Doe',
    email: 'dummy@email.com',
    password: 'secret',
    confirmPassword: 'secret',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserRepository],
    }).compile();

    repository = module.get<UserRepository>(UserRepository);
  });

  afterEach(async () => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
  });

  it('should create new user', async () => {
    jest.spyOn(repository.user, 'create').mockResolvedValue({
      id: 1,
      email: MOCK_USER.email,
      name: MOCK_USER.name,
      password: MOCK_USER.password,
    });

    await repository.create({
      name: MOCK_USER.name,
      email: MOCK_USER.email,
      password: MOCK_USER.password,
    });

    expect(repository.user.create).toBeCalledWith({
      data: {
        name: MOCK_USER.name,
        email: MOCK_USER.email,
        password: MOCK_USER.password,
      },
    });

    expect(repository.user.create).toBeCalledTimes(1);
  });

  it('should find user by email', async () => {
    jest.spyOn(repository.user, 'findUnique').mockResolvedValue({
      id: 1,
      email: MOCK_USER.email,
      name: MOCK_USER.name,
      password: MOCK_USER.password,
    });

    await repository.findByEmail(MOCK_USER.email);

    expect(repository.user.findUnique).toBeCalledWith({
      where: {
        email: MOCK_USER.email,
      },
    });

    expect(repository.user.findUnique).toBeCalledTimes(1);
  });
});
