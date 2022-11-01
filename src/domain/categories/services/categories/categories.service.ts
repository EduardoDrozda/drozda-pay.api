import { CreateCategoryDto, GetCategoryDto } from '../../dtos';

import { CategoriesRepository } from '../../repositories';
import { Injectable } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class CategoriesService {
  private readonly DEFAULT_CATEGORIES: any[] = [
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
    const { id, name, description } = await this.categoriesRepository.create(
      data,
    );

    return new GetCategoryDto({ id, name, description });
  }

  async findAllByUserId(userId: number) {
    const data = await this.categoriesRepository.findAllByUserId(userId);

    return data.map((category) => {
      const { id, name, description } = category;
      const getCategoryDto = new GetCategoryDto({ id, name, description });
      return getCategoryDto;
    });
  }

  async findById(id: number, userId: number) {
    const findCategory = await this.categoriesRepository.findById(id, userId);

    if (!findCategory) {
      throw new NotFoundException('Category not found');
    }

    return new GetCategoryDto(findCategory);
  }

  async update(id: number, userId: number, category: CreateCategoryDto) {
    const findCategory = await this.findById(id, userId);

    const updatedCategory = new GetCategoryDto({
      ...findCategory,
      ...category,
    });

    await this.categoriesRepository.update(id, updatedCategory);
    return updatedCategory;
  }

  async delete(id: number, userId: number) {
    await this.findById(id, userId);
    return await this.categoriesRepository.delete(id);
  }
}
