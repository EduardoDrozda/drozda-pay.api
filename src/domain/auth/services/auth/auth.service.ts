import * as bcrypt from 'bcryptjs';

import { Injectable, UnauthorizedException } from '@nestjs/common';

import { CredentialsDTO } from '../../dtos';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/domain/user';
import jwt from 'src/config/jwt';

@Injectable()
export class AuthService {
  private readonly USER_OR_PASSWORD_INVALID = 'Email or password is incorrect';
  private readonly USER_NOT_FOUND = 'User not found';
  constructor(
    private userService: UserService,
    private jwtTokenService: JwtService,
  ) {}

  async login(credentials: CredentialsDTO) {
    const user = await this.validateUserCredentials(credentials);
    const payload = { email: user.email, sub: user.id };

    return {
      token: this.jwtTokenService.sign(payload, {
        secret: jwt.secret,
        expiresIn: jwt.expiresIn,
      }),
      type: 'Bearer',
      expiresIn: jwt.expiresIn,
    };
  }

  private async validateUserCredentials(credentials: CredentialsDTO) {
    const user = await this.userService.findByEmail(credentials.email);

    if (!user || !(await bcrypt.compare(credentials.password, user.password))) {
      throw new UnauthorizedException(this.USER_OR_PASSWORD_INVALID);
    }

    return user;
  }

  async getLoggedUser(token: string) {
    const decode = this.jwtTokenService.decode(token.split(' ')[1]);
    const user = await this.userService.findByEmail(decode['email']);

    if (!user) {
      throw new UnauthorizedException(this.USER_NOT_FOUND);
    }

    const payload = { id: user.id, name: user.name, email: user.email };

    return payload;
  }
}
