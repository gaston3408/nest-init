import { Injectable } from '@nestjs/common';
import { UserCreateDto } from './dto/user-create.dto';
import { User, UserDocument } from './schemas/user';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { HashEncryptionService } from 'src/shared/encryption/hash-encryption.service';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private encryptionService: HashEncryptionService,
  ) {}

  async create(payload: UserCreateDto): Promise<User> {
    const user = {
      ...payload,
      password: await this.encryptionService.hash(payload.password),
    };

    return new this.userModel(user).save();
  }

  async getByEmail(email: string): Promise<User> {
    return this.userModel.findOne({ email });
  }
}
