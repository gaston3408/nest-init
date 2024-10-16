import MainConfigDto from './dto/main-config.dto';

export class Config {
  static get(): MainConfigDto {
    return {
      env: process.env.NODE_ENV,
      db: {
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT),
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        driver: process.env.DB_DRIVER,
      },
      web: {
        url: process.env.URL_WEB,
      },
      jwt: {
        secret: process.env.JWT_SECRET,
        expiresIn: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7, // 7 days,
        algorithm: 'HS256',
      },
      auth: {
        googleId: process.env.GOOGLE_CLIENT_ID,
        googleSecret: process.env.GOOGLE_CLIENT_SECRET,
      },
    };
  }
}
