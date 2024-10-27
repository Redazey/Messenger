import { Module } from '@nestjs/common';
import { ChatsService } from './chats.service';
import { ChatsController } from './chats.controller';
import { DatabaseModule } from '../database/database.module';
import { Chat } from './chats.entity';
import { UsersChats } from 'src/users_chats/users_chats.entity';

@Module({
  imports: [DatabaseModule],
  providers: [
    ChatsService,
    {
      provide: 'CHATS_REPOSITORY',
      useValue: Chat,
    },
    {
      provide: 'USERS_CHATS_REPOSITORY', // Добавляем UsersChats в качестве провайдера
      useValue: UsersChats,
    },
  ],
  exports: [ChatsService],
  controllers: [ChatsController],
})
export class ChatsModule {}
