import * as bcrypt from 'bcryptjs';

import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaAdapter } from 'src/shared';

@Injectable()
export class UserRepository extends PrismaAdapter {
  async onModuleInit(): Promise<void> {
    super.onModuleInit();

    await this.setUserMiddlewares();
  }
  async setUserMiddlewares() {
    this.$use(async (params, next) => {
      const middlwares = {
        User: this.userMiddlwares,
        hashPassword: this.hashPassword,
      };

      if (middlwares[params.model]) {
        await middlwares[params.model](params);
      }

      return next(params);
    });
  }

  private async userMiddlwares(params: Prisma.MiddlewareParams) {
    if (params.action === 'create') {
      params.args.data.password = await this.hashPassword(
        params.args.data.password,
      );
    }
  }

  private async hashPassword(password: string) {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    return hash;
  }

  async findByEmail(email: string) {
    return this.user.findUnique({
      where: {
        email,
      },
    });
  }

  async create(data: Prisma.UserCreateInput) {
    return this.user.create({
      data,
    });
  }
}
