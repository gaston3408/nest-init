import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import MainConfigDto from './dto/main-config.dto';

@Injectable()
class MainConfigService {
  constructor(private readonly configService: ConfigService) {}
  get(): MainConfigDto {
    return {
      env: this.configService.get('NODE_ENV'),
      db: {
        host: this.configService.get<string>('DB_HOST'),
        port: this.configService.get<number>('DB_PORT'),
        username: this.configService.get<string>('DB_USERNAME'),
        password: this.configService.get<string>('DB_PASSWORD'),
        database: this.configService.get<string>('DB_DATABASE'),
        driver: this.configService.get<string>('DB_DRIVER'),
      },
      web: {
        url: this.configService.get<string>('URL_WEB'),
      },
      jwt: {
        secret: this.configService.get<string>('JWT_SECRET'),
        expiresIn: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7, // 7 days,
        algorithm: 'HS256',
      },
    };
  }
}

export default MainConfigService;
