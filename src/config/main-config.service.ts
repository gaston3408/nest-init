import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import MainConfigDto from './dto/main-config.dto';

@Injectable()
class MainConfigService {
  constructor(private readonly configService: ConfigService) {}
  get(): MainConfigDto {
    return {
      db: {
        host: this.configService.get<string>('DB_HOST'),
        port: this.configService.get<number>('DB_PORT'),
        username: this.configService.get<string>('DB_USERNAME'),
        password: this.configService.get<string>('DB_PASSWORD'),
        database: this.configService.get<string>('DB_DATABASE'),
        driver: this.configService.get<string>('DB_DRIVER'),
        provider: this.configService.get<string>('DB_CONNECTION'),
      },
      web: {
        url: this.configService.get<string>('URL_WEB'),
      },
    };
  }
}

export default MainConfigService;
