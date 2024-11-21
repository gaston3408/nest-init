import { Injectable } from '@nestjs/common';
import { UserRepository } from './repository/user.repository';
import { User } from './schemas/user';
import { UserCreateDto } from './dto/user-create.dto';

@Injectable()
export class UserService {
  constructor(private repository: UserRepository) {}

  async create(payload: UserCreateDto): Promise<User> {
    const user = new User();
    user.firstName = payload.firstName;
    user.lastName = payload.lastName;
    user.email = payload.email;
    user.password = payload.password;

    return this.repository.create(user);
  }

  async getByEmail(email: string): Promise<User> {
    return this.repository.findOne({ email });
  }
}
