import { CreateSpendDto, GetSpendDto } from '../../dtos';

import { GetCategoryDto } from 'src/domain/categories';
import { Injectable } from '@nestjs/common';
import { SpendsRepository } from '../../repositories';

@Injectable()
export class SpendsService {
  constructor(private readonly spendsRepository: SpendsRepository) {}

  async create(data: CreateSpendDto) {
    const { id, name, description, amount } =
      await this.spendsRepository.create(data);

    return { id, name, description, amount };
  }

  async findAll(userId: any): Promise<GetSpendDto[]> {
    const data = await this.spendsRepository.findAll(userId);

    return data.map((spend) => {
      const { id, name, description, amount, Category: category } = spend;

      const getSpend = new GetSpendDto({
        id,
        name,
        description,
        amount,
        category,
      });

      return getSpend;
    });
  }
}
