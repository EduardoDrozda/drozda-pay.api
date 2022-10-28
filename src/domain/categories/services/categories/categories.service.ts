import { CategoriesRepository } from '../../repositories';
import { CreateCategoryDto } from '../../dtos';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CategoriesService {
  private readonly DEFAULT_CATEGORIES: CreateCategoryDto[] = [
    {
      name: 'Entradas',
      description: 'Categoria para valores que somam no saldo final',
    },
    {
      name: 'Saídas',
      description: 'Categoria para valores que diminuem o seu saldo final',
    },
    {
      name: 'Investimentos',
      description: 'Categoria para valores que você investe',
    },
  ];

  createDefaultCategories(userId: number) {
    this.DEFAULT_CATEGORIES.forEach((category) => {
      this.create({ ...category, userId });
    });
  }
  constructor(private readonly categoriesRepository: CategoriesRepository) {}
  async create(data: CreateCategoryDto) {
    return await this.categoriesRepository.create(data);
  }
}
