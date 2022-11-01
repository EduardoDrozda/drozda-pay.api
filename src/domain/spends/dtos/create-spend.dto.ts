import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

class CreateSpendDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @IsNotEmpty()
  @IsNumber()
  categoryId?: number;

  date: Date;

  userId: number;
}

export { CreateSpendDto };
