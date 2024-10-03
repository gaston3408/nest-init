import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import MainConfigService from './config/main-config.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const mainConfig = app.get(MainConfigService).get();

  app.enableCors({
    origin: [mainConfig.web.url],
  });

  await app.listen(8089);
}
bootstrap();
