import { CreateCategoryDto } from '../../dtos';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaAdapter } from 'src/shared/adapters';

@Injectable()
export class CategoriesRepository extends PrismaAdapter {
  async create(data: Prisma.CategoryCreateInput) {
    return await this.category.create({
      data,
    });
  }

  async findAllByUserId(userId: number) {
    return await this.category.findMany({
      where: {
        userId,
      },
    });
  }

  async findById(id: number, userId: number) {
    return await this.category.findFirst({
      where: {
        id,
        userId,
      },
    });
  }

  async update(id: number, category: Prisma.CategoryCreateInput) {
    return await this.category.update({
      where: {
        id,
      },
      data: category,
    });
  }

  async delete(id: number) {
    return await this.category.delete({
      where: {
        id,
      },
    });
  }
}
