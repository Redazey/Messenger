import { Controller, Get, Param } from '@nestjs/common';
import { ChatsService } from './chats.service';

@Controller('chats')
export class ChatsController {
  constructor(private chatsService: ChatsService) {}

  @Get('getChats/:user_id')
  getChats(@Param('user_id') user_id: number) {
    return this.chatsService.findAll(user_id);
  }
}
