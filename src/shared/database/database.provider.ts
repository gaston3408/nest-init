import * as mongoose from 'mongoose';
import MainConfigService from 'src/config/main-config.service';

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    inject: [MainConfigService],
    useFactory: (mainConfigService: MainConfigService) => {
      const { db } = mainConfigService.get();
      return mongoose.connect(
        `${db.driver}://${db.username}:${db.password}@${db.host}:${db.port}/${db.database}?authSource=admin`,
      );
    },
  },
];
