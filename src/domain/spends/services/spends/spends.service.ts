import { CreateSpendDto, GetSpendDto } from '../../dtos';

import { Injectable } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common';
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

  async findById(id: number, userId: number): Promise<GetSpendDto> {
    const findedSpend = await this.spendsRepository.findById(id, userId);

    if (!findedSpend) {
      throw new NotFoundException('Spend not found');
    }

    const { name, description, amount, Category: category } = findedSpend;

    const getSpend = new GetSpendDto({
      id,
      name,
      description,
      amount,
      category,
    });

    return getSpend;
  }

  update(id: number, userId: any, category: CreateSpendDto) {
    const findedSpend = this.spendsRepository.findById(id, userId);

    const updatedSpend = new GetSpendDto({
      ...findedSpend,
      ...category,
    });

    return this.spendsRepository.update(id, updatedSpend);
  }

  async findTotal(userId: any): Promise<any> {
    await this.spendsRepository.findTotal(userId);
  }

  async delete(id: number, userId: any) {
    await this.findById(id, userId);

    return this.spendsRepository.delete(id);
  }
}
