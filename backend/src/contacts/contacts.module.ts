import { Module } from '@nestjs/common';
import { ContactsService } from './contacts.service';
import { ChatsModule } from 'src/chats/chats.module';
import { Contact } from './contacts.entity';
import { ContactsController } from './contacts.controller';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [ChatsModule, DatabaseModule],
  providers: [
    ContactsService,
    {
      provide: 'CONTACTS_REPOSITORY',
      useValue: Contact,
    },
  ],
  controllers: [ContactsController],
})
export class ContactsModule {}
