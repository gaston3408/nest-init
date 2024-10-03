import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import MainConfigService from './config/main-config.service';
import { databaseProviders } from './shared/database/database.provider';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env`,
      isGlobal: true,
    }),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [MainConfigService, AppService, ...databaseProviders],
  exports: [...databaseProviders],
})
export class AppModule {}
