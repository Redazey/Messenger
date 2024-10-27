import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { userProviders } from './users.provider';
import { UsersController } from './users.controller';

@Module({
  providers: [UsersService, ...userProviders],
  exports: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
