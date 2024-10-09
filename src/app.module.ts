import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { MongooseConfigModule } from './shared/database/mongoose-config.module';
import { ConfigEnvModule } from './shared/config/config-env.module';

@Module({
  imports: [MongooseConfigModule, ConfigEnvModule, AuthModule, UserModule],
})
export class AppModule {}
