import { CategoriesRepository } from '../../repositories';
import { CreateCategoryDto } from '../../dtos';
import { Injectable } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common';

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

  constructor(private readonly categoriesRepository: CategoriesRepository) {}

  async createDefaultCategories(userId: number) {
    this.DEFAULT_CATEGORIES.forEach((category) => {
      this.create({ ...category, userId });
    });
  }

  async create(data: CreateCategoryDto) {
    return await this.categoriesRepository.create(data);
  }

  async findAllByUserId(userId: number) {
    return await this.categoriesRepository.findAllByUserId(userId);
  }

  async findById(id: number, userId: number) {
    const findCategory = await this.categoriesRepository.findById(id, userId);

    if (!findCategory) {
      throw new NotFoundException('Category not found');
    }

    return findCategory;
  }

  async update(id: number, userId: number, category: CreateCategoryDto) {
    const findCategory = await this.findById(id, userId);

    findCategory.name = category.name;
    findCategory.description = category.description;

    return await this.categoriesRepository.update(id, category);
  }

  async delete(id: number, userId: number) {
    await this.findById(id, userId);
    return await this.categoriesRepository.delete(id);
  }
}
