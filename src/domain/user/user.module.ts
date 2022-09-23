import { Module } from '@nestjs/common';
import { PrismaAdapter } from 'src/shared';
import { UserController } from './controllers/user/user.controller';
import { UserRepository } from './repositories';
import { UserService } from './services/user/user.service';

@Module({
  controllers: [UserController],
  providers: [UserService, UserRepository, PrismaAdapter],
})
export class UserModule {}
