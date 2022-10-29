import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaAdapter } from 'src/shared/adapters';

@Injectable()
export class CategoriesRepository extends PrismaAdapter {
  async create(data: Prisma.CategoryCreateInput) {
    return this.category.create({
      data,
    });
  }
}
