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
import { Observable, Subject } from 'rxjs';

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
  deleteMessage(@Body() credentials: { message_id: number }) {
    return this.messageService.delete(credentials.message_id);
  }

  @Get('get/:chat_id')
  getMessages(@Param('chat_id') chat_id: number) {
    return this.messageService.findAll(chat_id);
  }

  @Sse('getSSE/:chat_id')
  getSSEMessages(@Param('chat_id') chat_id: number): Observable<MessageEvent> {
    const subject = new Subject<MessageEvent>();

    this.messageService.subscribeToChat(chat_id.toString(), subject);

    return subject.asObservable();
  }
}
