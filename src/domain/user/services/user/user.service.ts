import { Injectable, UnprocessableEntityException } from '@nestjs/common';

import { CreateUserDTO } from '../../dtos';
import { UserRepository } from '../../repositories';

@Injectable()
export class UserService {
  private readonly USER_ALREADY_EXISTS = 'User already exists';

  constructor(private readonly userRepository: UserRepository) {}

  async create(createUserDto: CreateUserDTO) {
    await this.verifyUserExistsByEmail(createUserDto.email);
    const { name, email, password } = createUserDto;
    await this.userRepository.create({ name, email, password });
    return { name, email };
  }

  async verifyUserExistsByEmail(email: string) {
    const findedUser = await this.userRepository.findByEmail(email);

    if (findedUser) {
      throw new UnprocessableEntityException(this.USER_ALREADY_EXISTS);
    }
  }
}
