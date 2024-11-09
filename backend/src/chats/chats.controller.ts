import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ChatsService } from './chats.service';
import { CreateChatDto } from './createChat.dto';

@Controller('chats')
export class ChatsController {
  constructor(private chatsService: ChatsService) {}

  @Get('getChats/:user_id')
  getChats(@Param('user_id') user_id: number) {
    return this.chatsService.findAll(user_id);
  }

  @Post('create')
  createChat(@Body() createChatDto: CreateChatDto) {
    return this.chatsService.create(createChatDto);
  }
}
