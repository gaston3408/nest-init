interface MainConfigDto {
  env: string;
  db: {
    host: string;
    port: number;
    username: string;
    password: string;
    database: string;
    driver: string;
  };
  web: {
    url: string;
  };
  jwt: {
    secret: string;
    expiresIn: number;
    algorithm: 'HS256';
  };
  auth: {
    googleId: string;
    googleSecret: string;
  };
}

export default MainConfigDto;
