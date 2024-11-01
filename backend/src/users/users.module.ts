import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './users.entity';
import { UsersChatsModule } from 'src/users_chats/users_chats.module';

@Module({
  imports: [UsersChatsModule],
  providers: [
    UsersService,
    {
      provide: 'USERS_REPOSITORY',
      useValue: User,
    },
  ],
  exports: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
