import { Module } from '@nestjs/common';
import { UserController } from './controllers/user/user.controller';
import { UserRepository } from './repositories';
import { UserService } from './services/user/user.service';

@Module({
  controllers: [UserController],
  providers: [UserService, UserRepository],
})
export class UserModule {}
