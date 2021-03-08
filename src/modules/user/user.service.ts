import { Inject, Injectable } from '@nestjs/common';
import { User } from '../../models/User';
import { AbstractService } from '../../shared/services';
import { USER_REPOSITORY } from '../../common/constants';
import {
  Op,
} from 'sequelize'

@Injectable()
export class UserService extends AbstractService<User> {
  constructor(
    @Inject(USER_REPOSITORY) private readonly userRepository: typeof User,
  ) {
    super(userRepository);
  }

  async rollingRetention(lastXDays: number): Promise<number> {
    const date = new Date();
    date.setDate(date.getDate()-lastXDays);

    // (количество пользователей, вернувшихся в систему в X-ый день или позже)
    const lastActivityUsersForLastXDays = await this.getAll({
      where: {
        lastActivity: {
          [Op.between]: [date.toISOString(), new Date().toISOString()]
        }
      }
    });


    // (количество пользователей, установивших приложение X дней назад или раньше)
    const dateRegisteredForLastXDays = await this.getAll({
      where: {
        dateRegistered: {
          [Op.between]: [date.toISOString(), new Date().toISOString()]
        }
      }
    });

   return lastActivityUsersForLastXDays.count / dateRegisteredForLastXDays.count * 100 || 0;
  }
}
