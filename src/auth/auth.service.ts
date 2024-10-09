import { Injectable } from '@nestjs/common';
import { RegistrationAuthDto } from './dto/registration-auth.dto';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/schemas/user';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async register(registrationAuthDto: RegistrationAuthDto): Promise<User> {
    return await this.userService.create(registrationAuthDto);
  }
}
