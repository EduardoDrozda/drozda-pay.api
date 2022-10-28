import { CategoriesModule } from '../categories';
import { Module } from '@nestjs/common';
import { UserController } from './controllers/user/user.controller';
import { UserRepository } from './repositories';
import { UserService } from './services/user/user.service';

@Module({
  imports: [CategoriesModule],
  controllers: [UserController],
  providers: [UserService, UserRepository],
  exports: [UserService, UserRepository],
})
export class UserModule {}
