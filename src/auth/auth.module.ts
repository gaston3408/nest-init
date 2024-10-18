import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { HashEncryptionService } from 'src/shared/encryption/hash-encryption.service';
import { SERVICES } from 'src/config/constants/services';

@Module({
  imports: [UserModule],
  controllers: [AuthController],
  providers: [
    AuthService,
    {
      provide: SERVICES.IEncryptionService,
      useClass: HashEncryptionService,
    },
  ],
})
export class AuthModule {}
