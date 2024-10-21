import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ContactsController } from './contacts/contacts.controller';
import { ContactsModule } from './contacts/contacts.module';
import { MessagesModule } from './messages/messages.module';
import { ChatsController } from './chats/chats.controller';
import { ChatsModule } from './chats/chats.module';

@Module({
  imports: [AuthModule, ContactsModule, MessagesModule, ChatsModule],
  controllers: [ContactsController, ChatsController],
})
export class AppModule {}
