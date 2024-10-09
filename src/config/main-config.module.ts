import { Module } from '@nestjs/common';
import MainConfigService from './main-config.service';

@Module({
  providers: [MainConfigService],
  exports: [MainConfigService],
})
export class MainConfigModule {}
