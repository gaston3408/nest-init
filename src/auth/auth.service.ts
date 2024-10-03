import { Injectable } from '@nestjs/common';
import { RegistrationAuthDto } from './dto/registration-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';

@Injectable()
export class AuthService {
  register(registrationAuthDto: RegistrationAuthDto) {
    console.log('register: ', registrationAuthDto);
    return 'This action register a new user';
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
