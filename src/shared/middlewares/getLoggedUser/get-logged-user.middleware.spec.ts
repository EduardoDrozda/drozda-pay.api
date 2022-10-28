import { Test, TestingModule } from '@nestjs/testing';

import { AuthModule } from 'src/domain/auth/auth.module';
import { AuthService } from 'src/domain/auth/services/auth/auth.service';
import { GetLoggedUserMiddleware } from './get-logged-user.middleware';
import { INestApplication } from '@nestjs/common';

describe('GetLoggedUserMiddleware', () => {
  let app: INestApplication;
  let getLoggedUserMiddleware: GetLoggedUserMiddleware;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AuthModule],
      providers: [GetLoggedUserMiddleware],
    }).compile();

    getLoggedUserMiddleware = module.get<GetLoggedUserMiddleware>(
      GetLoggedUserMiddleware,
    );

    authService = module.get<AuthService>(AuthService);

    app = module.createNestApplication();
    await app.init();
  });

  it('should be defined', () => {
    expect(getLoggedUserMiddleware).toBeDefined();
  });

  it('should insert user inside middleware', async () => {
    jest.spyOn(authService, 'getLoggedUser').mockResolvedValue({
      id: 1,
      email: 'dummy@email.com',
      name: 'John Doe',
    });

    const req: any = {
      headers: {
        authorization:
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImVtYWlsQGVtYWlsLmNvbSIsInN1YiI6MSwiaWF0IjoxNjY2OTk4OTk5LCJleHAiOjE2NjcwODUzOTl9.zW23jvMMaLUC65mGiXn2SkIp0oYOCIq9JNY_--4du4I',
      },
    };

    const res = {};
    const next = jest.fn();

    await getLoggedUserMiddleware.use(req, res, next);
    expect(req.userId).toEqual(1);
    expect(next).toHaveBeenCalled();
    expect(authService.getLoggedUser).toHaveBeenCalled();
  });
});
