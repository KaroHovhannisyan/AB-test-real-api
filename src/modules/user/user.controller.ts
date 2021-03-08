import { Controller, Body, Post, Get, Param, Query, Delete } from '@nestjs/common';
import { ApiTags, ApiOkResponse } from '@nestjs/swagger';
import { User } from '../../models/User';
import { UserService } from './user.service';
import { IGetAllData } from '../../interfaces/IGetAllData';
import { CreateUsersDto } from './dto/UserDto';

@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('')
  @ApiOkResponse({ type: Array, description: 'Get all users' })
  async getUsersList(): Promise<IGetAllData<User>> {
    return await this.userService.getAll();
  }

  @Get('/:userId')
  @ApiOkResponse({ type: User, description: 'Get user' })
  async getUser(@Param('userId') id: number): Promise<User> {
    return await this.userService.findOne({ id });
  }

  @Delete('/:userId')
  @ApiOkResponse({ type: User, description: 'Remove user' })
  async removeUser(@Param('userId') id: number): Promise<User> {
    return await this.userService.delete({ where: { id } });
  }

  @Post('/add')
  @ApiOkResponse()
  async addNewUsers(@Body() data: CreateUsersDto): Promise<void> {
    for (const user of data.users) {
      await this.userService.create(user);
    }
  }

  @Get('rolling-retention/:lastXDays')
  @ApiOkResponse({ type: Number, description: 'Get Rolling Retention for last X Days' })
  async rollingRetention(@Param('lastXDays') lastXDays: number): Promise<number> {
    return this.userService.rollingRetention(lastXDays);
  }
}
