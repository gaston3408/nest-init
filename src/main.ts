import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import MainConfigService from './config/main-config.service';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const mainConfig = app.get(MainConfigService).get();

  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({
    origin: [mainConfig.web.url],
  });

  await app.listen(8089);
}
bootstrap();
