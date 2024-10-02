const config = {
  driver: process.env.DB_DRIVER,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  port: process.env.DB_PORT,
  provider: process.env.DB_CONNECTION,
  urlWeb: process.env.URL_WEB,
};

export default config;
