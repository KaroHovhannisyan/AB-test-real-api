'use strict';

import { ApiPropertyOptional, ApiProperty } from '@nestjs/swagger';

import { AbstractDto } from '../../../common/dto/AbstractDto';
import { User } from '../../../models/User';

export class UserDto extends AbstractDto {
  @ApiPropertyOptional()
  name: string;

  @ApiProperty()
  lastActivity: Date;

  @ApiProperty()
  dateRegistered: Date;

  constructor(user: User) {
    super(user);
    this.lastActivity = user.lastActivity;
    this.dateRegistered = user.dateRegistered;
  }
}

export class CreateUsersDto {
  @ApiPropertyOptional()
  users: UserDto[];
}
