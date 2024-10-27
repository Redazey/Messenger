import { Body, Controller, Post } from '@nestjs/common';
import { ChatsService } from 'src/chats/chats.service';
import { ContactsService } from './contacts.service';
import { NewContactDto } from './newcontact.dto';

@Controller('contacts')
export class ContactsController {
  constructor(
    private chatsService: ChatsService,
    private contactsService: ContactsService
  ) {}

  @Post('newContact')
  signIn(@Body() newContactDto: NewContactDto) {
    this.contactsService.create({
      user_id: newContactDto.user_id,
      contact_id: newContactDto.contact_id,
    });
    return this.chatsService.create({
      name: newContactDto.chatname,
      user_id: [newContactDto.user_id, newContactDto.contact_id],
    });
  }
}
