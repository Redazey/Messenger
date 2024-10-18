import {
  Controller,
  Get,
  Param,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { Chat } from 'src/models/chats.model';

@Controller('messages')
export class MessagesController {
  @Get(':chat_id')
  async getChatMessages(@Param('chat_id') chat_id: number): Promise<Chat[]> {
    try {
      const chatMessages = await Chat.findAll({
        where: {
          chat_id: chat_id,
        },
      });

      if (!chatMessages) {
        throw new NotFoundException('Chat not found');
      }

      return chatMessages;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
