import { Module } from '@nestjs/common';
import { ContactsService } from './contacts.service';
import { Contact } from './contacts.entity';
import { ContactsController } from './contacts.controller';
import { DatabaseModule } from 'src/database/database.module';
import { ChatsModule } from 'src/chats/chats.module';

@Module({
  imports: [ChatsModule, DatabaseModule],
  providers: [
    ContactsService,
    {
      provide: 'CONTACTS_REPOSITORY',
      useValue: Contact,
    },
    {
      provide: 'USERS_REPOSITORY',
      useValue: Contact,
    },
  ],
  exports: [ContactsService],
  controllers: [ContactsController],
})
export class ContactsModule {}
