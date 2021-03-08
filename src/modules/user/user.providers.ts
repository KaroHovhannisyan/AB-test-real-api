import { User } from '../../models/User';
import { ConfigService } from '../../shared/services';
import { USER_REPOSITORY } from '../../common/constants';
import { UserService } from './user.service';

export const userProviders = [
  {
    provide: USER_REPOSITORY,
    useValue: User,
  },
  UserService,
  ConfigService,
];
