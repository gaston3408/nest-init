import { IsEmail, IsString, Matches } from 'class-validator';
import { Match } from '../../shared/validation/decorator/match.decorator';

export class UserCreateDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  @Matches(/.{8,}/, { message: 'Password must be at least 8 characters long' })
  password: string;

  @IsString()
  @Match('password')
  passwordConfirmation: string;
}
