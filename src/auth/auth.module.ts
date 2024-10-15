import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { HashEncryptionService } from 'src/shared/encryption/hash-encryption.service';
import MainConfigService from 'src/config/main-config.service';

@Module({
  imports: [UserModule],
  controllers: [AuthController],
  providers: [AuthService, HashEncryptionService, MainConfigService],
})
export class AuthModule {}
