import { GetSpendDto } from '../../dtos';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaAdapter } from 'src/shared/adapters';

@Injectable()
export class SpendsRepository extends PrismaAdapter {
  async onModuleInit(): Promise<void> {
    super.onModuleInit();
    await this.setSpendsMiddleware();
  }
  async setSpendsMiddleware() {
    this.$use(async (params, next) => {
      const middlwares = {
        Spend: this.spendMiddleware,
      };

      if (middlwares[params.model]) {
        await middlwares[params.model](params);
      }

      return next(params);
    });
  }

  private async spendMiddleware(params: Prisma.MiddlewareParams) {
    if (params.action === 'create') {
      params.args.data.date = new Date();
    }
  }

  async create(data: Prisma.SpendCreateInput) {
    return this.spend.create({
      data,
    });
  }

  async findAll(userId: any) {
    return this.spend.findMany({
      where: {
        userId,
      },
      include: {
        Category: true,
      },
    });
  }

  async findById(id: number, userId: number) {
    return await this.spend.findFirst({
      where: {
        id,
        userId,
      },
      include: {
        Category: true,
      },
    });
  }

  async update(id: number, updatedSpend: GetSpendDto) {
    return this.spend.update({
      where: {
        id,
      },
      data: {
        ...updatedSpend,
      },
    });
  }

  async delete(id: number) {
    return this.spend.delete({
      where: {
        id,
      },
    });
  }

  async findTotal(userId: any) {
    return await this.spend.groupBy({
      by: ['categoryId'],
      where: {
        userId,
      },
      _sum: {
        amount: true,
      },
    });
  }
}
