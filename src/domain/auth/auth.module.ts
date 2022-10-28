import { JwtModule, JwtService } from '@nestjs/jwt';

import { AuthController } from './controllers/auth/auth.controller';
import { AuthService } from './services/auth/auth.service';
import { JwtStrategy } from 'src/shared/strategies';
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from '../user';
import jwt from 'src/config/jwt';

@Module({
  controllers: [AuthController],
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: jwt.secret,
      signOptions: { expiresIn: jwt.expiresIn },
    }),
  ],
  providers: [AuthService, JwtService, JwtStrategy],
})
export class AuthModule {}
