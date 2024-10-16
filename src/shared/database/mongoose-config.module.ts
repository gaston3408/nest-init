import { MongooseModule, MongooseModuleFactoryOptions } from '@nestjs/mongoose';
import { Config } from 'src/config';

export const MongooseConfigModule = MongooseModule.forRootAsync({
  useFactory: (): MongooseModuleFactoryOptions => {
    const { env, db } = Config.get();

    const uri = `${db.driver}://${db.host}:${db.port}/${db.database}?authSource=admin`;

    const auth: any = {};

    if (env === 'production') {
      auth.user = db.username;
      auth.pass = db.password;
    }

    return {
      uri,
      autoIndex: true,
      ...auth,
    };
  },
});
