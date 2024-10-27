import { Body, Controller, Post } from '@nestjs/common';
import { ChatsService } from './chats.service';

@Controller('chats')
export class ChatsController {
  constructor(private chatsService: ChatsService) {}

  @Post('getChats')
  signIn(@Body() user_id: number) {
    return this.chatsService.findAll(user_id);
  }
}
