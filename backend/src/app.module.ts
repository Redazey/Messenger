import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ContactsController } from './controllers/contacts/contacts.controller';
import { MessagesController } from './controllers/messages/messages.controller';
import { UsersController } from './controllers/users/users.controller';

@Module({
  imports: [],
  controllers: [
    AppController,
    ContactsController,
    MessagesController,
    UsersController,
  ],
  providers: [AppService],
})
export class AppModule {}
