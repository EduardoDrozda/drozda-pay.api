import { Injectable, NestMiddleware } from '@nestjs/common';

import { AuthService } from 'src/domain/auth/services/auth/auth.service';

@Injectable()
export class GetLoggedUserMiddleware implements NestMiddleware {
  constructor(private readonly authService: AuthService) {}

  async use(req: any, res: any, next: () => void) {
    await this.getLoggedUser(req);
    next();
  }

  private async getLoggedUser(req: any) {
    const token = req.headers.authorization;

    if (!token) {
      return;
    }

    const { id } = await this.authService.getLoggedUser(token);
    req.userId = id;
  }
}
