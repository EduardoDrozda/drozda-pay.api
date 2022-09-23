import { IsEmail, IsNotEmpty } from 'class-validator';

import { Match } from 'src/shared/decorators';

export class CreateUserDTO {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  @Match('password')
  confirmPassword: string;
}
