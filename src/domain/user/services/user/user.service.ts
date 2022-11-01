import { Injectable, UnprocessableEntityException } from '@nestjs/common';

import { CategoriesService } from 'src/domain/categories/services';
import { CreateUserDTO } from '../../dtos';
import { UserRepository } from '../../repositories';

@Injectable()
export class UserService {
  private readonly USER_ALREADY_EXISTS = 'User already exists';

  constructor(
    private readonly userRepository: UserRepository,
    private readonly categoriesService: CategoriesService,
  ) {}

  async create(createUserDto: CreateUserDTO) {
    await this.verifyUserExistsByEmail(createUserDto.email);
    const { name, email, password } = createUserDto;
    const { id } = await this.userRepository.create({ name, email, password });
    await this.createDefaultCategories(id);
    return { name, email };
  }

  private async createDefaultCategories(userId: number) {
    await this.categoriesService.createDefaultCategories(userId);
  }

  async verifyUserExistsByEmail(email: string) {
    const findedUser = await this.findByEmail(email);

    if (findedUser) {
      throw new UnprocessableEntityException(this.USER_ALREADY_EXISTS);
    }
  }

  async findByEmail(email: string) {
    return await this.userRepository.findByEmail(email);
  }
}
