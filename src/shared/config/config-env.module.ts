import { ConfigModule } from '@nestjs/config';

export const ConfigEnvModule = ConfigModule.forRoot({
  envFilePath: `.env`,
  isGlobal: true,
});
