import { Injectable } from '@nestjs/common';
import { UserCreateDto } from './dto/user-create.dto';
import { User } from './schemas/user';
import { HashEncryptionService } from 'src/shared/encryption/hash-encryption.service';
import { UserRepository } from './repository/user.repository';

@Injectable()
export class UserService {
  constructor(
    private repository: UserRepository,
    private encryptionService: HashEncryptionService,
  ) {}

  async create(payload: UserCreateDto): Promise<User> {
    const user = new User();
    user.firstName = payload.firstName;
    user.lastName = payload.lastName;
    user.email = payload.email;
    user.password = payload.password
      ? await this.encryptionService.hash(payload.password)
      : null;

    return this.repository.create(user);
  }

  async getByEmail(email: string): Promise<User> {
    return this.repository.findOne({ email });
  }
}
