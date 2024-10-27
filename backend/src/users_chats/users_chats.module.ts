import { Module } from '@nestjs/common';
import { users_chatsProviders } from './users_chats.provider';

@Module({
  providers: [...users_chatsProviders],
})
export class UsersChatsModule {}
