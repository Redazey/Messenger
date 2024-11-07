import {
  Body,
  Controller,
  Get,
  MessageEvent,
  Param,
  Post,
  Sse,
} from '@nestjs/common';
import { CreateMessageDto, EditMessageDto } from './messages.dto';
import { MessagesService } from './messages.service';
import { map, Observable } from 'rxjs';

@Controller('messages')
export class MessagesController {
  constructor(private messageService: MessagesService) {}

  @Post('send')
  sendMessage(@Body() sendMessageDto: CreateMessageDto) {
    return this.messageService.create(sendMessageDto);
  }

  @Post('edit')
  editMessage(@Body() sendMessageDto: EditMessageDto) {
    return this.messageService.edit(sendMessageDto);
  }

  @Post('delete')
  deleteMessage(@Body() message_id: number) {
    return this.messageService.delete(message_id);
  }

  @Get('get/:chat_id')
  getMessages(@Param('chat_id') chat_id: number) {
    return this.messageService.findAll(chat_id);
  }

  @Sse('getSSE')
  getSSEMessages(): Observable<MessageEvent> {
    return this.messageService.messagesObservable.pipe(
      map(message => ({
        data: message,
      }))
    );
  }
}
