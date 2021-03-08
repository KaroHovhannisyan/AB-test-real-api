import { Sequelize } from 'sequelize-typescript';
import { User } from '../models/User';
import { ConfigService } from '../shared/services';

const configService = new ConfigService();

export const databaseProviders = [
  {
    provide: 'SequelizeToken',
    useFactory: async () => {
      const sequelize = new Sequelize(configService.sequlizeConfigs);
      sequelize.addModels([User]);
      // await sequelize.sync({ force: true });
      return sequelize;
    },
  },
];
