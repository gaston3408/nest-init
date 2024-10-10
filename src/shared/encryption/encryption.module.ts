import { Module } from '@nestjs/common';
import { HashEncryptionService } from './hash-encryption.service';

// Factory or Strategy for encrypting
@Module({
  providers: [HashEncryptionService],
  exports: [HashEncryptionService],
})
export class EncryptionModule {}
