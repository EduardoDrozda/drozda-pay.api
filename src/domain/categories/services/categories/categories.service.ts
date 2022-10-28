import { CategoriesRepository } from '../../repositories';
import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from '../../dtos';

@Injectable()
export class CategoriesService {
  constructor(private readonly categoriesRepository: CategoriesRepository) {}
  async create(category: CreateCategoryDto) {
    return 'create';
  }
}
