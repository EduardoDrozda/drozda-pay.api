import { CategoriesRepository } from '../../repositories';
import { CreateCategoryDto } from '../../dtos';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CategoriesService {
  constructor(private readonly categoriesRepository: CategoriesRepository) {}
  async create(data: CreateCategoryDto) {
    return await this.categoriesRepository.create(data);
  }
}
