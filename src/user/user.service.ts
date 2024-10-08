import { Injectable } from '@nestjs/common';
import { UserCreateDto } from './dto/user-create.dto';
import { User } from './schemas/user';

@Injectable()
export class UserService {
  create(payload: UserCreateDto): Promise<User> {
    const user = new User();
    user.firstName = payload.firstName;
    user.lastName = payload.lastName;
    user.email = payload.email;
    user.password = payload.password;

    return Promise.resolve(user);
  }
}
