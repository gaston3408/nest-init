import { MongooseModule, MongooseModuleFactoryOptions } from '@nestjs/mongoose';
import { MainConfigModule } from 'src/config/main-config.module';
import MainConfigService from 'src/config/main-config.service';

export const MongooseConfigModule = MongooseModule.forRootAsync({
  imports: [MainConfigModule],
  inject: [MainConfigService],
  useFactory: (
    mainConfigService: MainConfigService,
  ): MongooseModuleFactoryOptions => {
    const { env, db } = mainConfigService.get();

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
