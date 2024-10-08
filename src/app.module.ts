import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import MainConfigService from './config/main-config.service';
import { databaseProviders } from './shared/database/database.provider';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env`,
      isGlobal: true,
    }),
    AuthModule,
    UserModule,
  ],
  controllers: [],
  providers: [MainConfigService, ...databaseProviders],
  exports: [...databaseProviders],
})
export class AppModule {}
