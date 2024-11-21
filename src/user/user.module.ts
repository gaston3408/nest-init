import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user';
import { HashEncryptionService } from 'src/shared/encryption/hash-encryption.service';
import { UserRepository } from './repository/user.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  providers: [UserService, HashEncryptionService, UserRepository],
  exports: [UserService],
})
export class UserModule {}
