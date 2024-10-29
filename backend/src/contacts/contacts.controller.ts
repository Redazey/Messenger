import { Body, Controller, Get, Param, Post } from '@nestjs/common';
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
  newContact(@Body() newContactDto: NewContactDto) {
    this.contactsService.create({
      user_id: newContactDto.user_id,
      contact_id: newContactDto.contact_id,
    });
    return this.chatsService.create({
      name: newContactDto.chatname,
      user_id: [newContactDto.user_id, newContactDto.contact_id],
    });
  }

  @Post('deleteContact')
  deleteContact(@Body() deleteContactDto: NewContactDto) {
    return this.chatsService.create({
      name: deleteContactDto.chatname,
      user_id: [deleteContactDto.user_id, deleteContactDto.contact_id],
    });
  }

  @Get('getContacts/:user_id')
  getContacts(@Param('user_id') user_id: number) {
    const contacts = this.contactsService.findAll(user_id);
    return contacts;
  }
}
