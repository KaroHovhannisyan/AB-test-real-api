import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { userProviders } from './user.providers';
import { UserController } from './user.controller';

@Module({
  exports: [UserService],
  controllers: [UserController],
  providers: [...userProviders],
})
export class UserModule {}
