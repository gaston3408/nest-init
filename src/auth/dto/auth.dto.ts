import { User } from 'src/user/schemas/user';

export class AuthDto {
  token: string;
  user: Partial<User>;
}
