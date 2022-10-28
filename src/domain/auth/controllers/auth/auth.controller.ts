import {
  Body,
  Controller,
  Get,
  Headers,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/shared/guards';
import { CredentialsDTO } from '../../dtos';
import { AuthService } from '../../services/auth/auth.service';

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.CREATED)
  async login(@Body() credetials: CredentialsDTO) {
    return this.authService.login(credetials);
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  async getLoggedUser(@Headers('Authorization') token: string) {
    return await this.authService.getLoggedUser(token);
  }
}
