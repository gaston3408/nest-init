import * as mongoose from 'mongoose';
import config from 'src/config';

export const databaseProviders = [
  {
    provide: config.provider,
    useFactory: () =>
      mongoose.connect(
        `${config.driver}://${config.username}:${config.password}@${config.host}/${config.database}?authSource=admin`,
      ),
  },
];
