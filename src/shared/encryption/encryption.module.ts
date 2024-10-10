import { Module } from '@nestjs/common';
import { EncryptionService } from './encryption.service';

// Factory or Strategy for encrypting
@Module({
  providers: [EncryptionService],
  exports: [EncryptionService],
})
export class EncryptionModule {}
