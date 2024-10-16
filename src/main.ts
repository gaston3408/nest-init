import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { Config } from './config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const mainConfig = Config.get();

  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({
    origin: [mainConfig.web.url],
  });

  await app.listen(8089);
}
bootstrap();
