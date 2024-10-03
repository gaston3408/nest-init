interface MainConfigDto {
  db: {
    host: string;
    port: number;
    username: string;
    password: string;
    database: string;
    driver: string;
    provider: string;
  };
  web: {
    url: string;
  };
}

export default MainConfigDto;
