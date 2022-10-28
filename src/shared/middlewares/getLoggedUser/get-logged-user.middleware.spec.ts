import { GetLoggedUserMiddleware } from './get-logged-user.middleware';

describe('GetLoggedUserMiddleware', () => {
  it('should be defined', () => {
    expect(new GetLoggedUserMiddleware()).toBeDefined();
  });
});
