import { Module } from '@nestjs/common';
import { MessagesController } from './messages.controller';
import { MessagesService } from './messages.service';
import { Message } from './messages.entity';

@Module({
  controllers: [MessagesController],
  providers: [
    MessagesService,
    {
      provide: 'MESSAGES_REPOSITORY',
      useValue: Message,
    },
  ],
})
export class MessagesModule {}
