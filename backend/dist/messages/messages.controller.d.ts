import { MessageEvent } from '@nestjs/common';
import { CreateMessageDto, EditMessageDto } from './messages.dto';
import { MessagesService } from './messages.service';
import { Observable } from 'rxjs';
export declare class MessagesController {
    private messageService;
    constructor(messageService: MessagesService);
    sendMessage(sendMessageDto: CreateMessageDto): Promise<import("./messages.entity").Message>;
    editMessage(sendMessageDto: EditMessageDto): Promise<void>;
    deleteMessage(message_id: number): Promise<void>;
    getMessages(chat_id: number): Promise<import("./messages.entity").Message[]>;
    getSSEMessages(): Observable<MessageEvent>;
}
