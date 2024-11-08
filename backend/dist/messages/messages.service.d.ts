import { Message } from './messages.entity';
import { CreateMessageDto, EditMessageDto } from './messages.dto';
export declare class MessagesService {
    private messages;
    private ee;
    private chatSubscribers;
    constructor(messages: typeof Message);
    findAll(chat_id: number): Promise<Message[] | undefined>;
    edit(editMessageDto: EditMessageDto): Promise<void>;
    delete(message_id: number): Promise<void>;
    subscribeToChat(chat_id: string, subscriber: any): void;
    create(createMessageDto: CreateMessageDto): Promise<Message | undefined>;
}
