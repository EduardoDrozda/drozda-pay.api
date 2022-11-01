import { GetCategoryDto } from 'src/domain/categories';

class GetSpendDto {
  readonly id: number;
  readonly name: string;
  readonly description: string;
  readonly amount: number;

  readonly category?: GetCategoryDto;

  constructor(partial: Partial<GetSpendDto>) {
    Object.assign(this, partial);
  }
}

export { GetSpendDto };
