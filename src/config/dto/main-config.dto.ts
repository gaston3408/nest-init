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
}

export default MainConfigDto;
