import { Injectable } from '@nestjs/common';
import { UserCreateDto } from './dto/user-create.dto';
import { User, UserDocument } from './schemas/user';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EncryptionService } from 'src/shared/encryption/encryption.service';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>, private encryptionService: EncryptionService) {}

  async create(payload: UserCreateDto): Promise<User> {
    const user = {
      ...payload,
      password: await this.encryptionService.hash(payload.password),
    };

    return new this.userModel(user).save();
  }
}
