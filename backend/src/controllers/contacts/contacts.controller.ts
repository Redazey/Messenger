import {
  Controller,
  Get,
  Param,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { Contact } from 'src/models/contacts.model';

@Controller('contacts')
export class ContactsController {
  @Get(':user_id')
  async getUserContacts(@Param('user_id') user_id: number): Promise<Contact[]> {
    try {
      const userContacts = await Contact.findAll({
        where: {
          user_id: user_id,
        },
      });

      if (!userContacts) {
        throw new NotFoundException('Comment not found');
      }

      return userContacts;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
