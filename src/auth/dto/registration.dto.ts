import { IsString, IsEmail, Matches } from 'class-validator';
import { Match } from 'src/shared/validation/decorator/match.decorator';

export class RegistrationDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  @Matches(/.{8,}/, { message: 'Password must be at least 8 characters long' })
  password?: string;

  @IsString()
  @Match('password')
  passwordConfirmation?: string;
}
