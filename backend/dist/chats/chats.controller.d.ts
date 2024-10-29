import { ChatsService } from './chats.service';
export declare class ChatsController {
    private chatsService;
    constructor(chatsService: ChatsService);
    getChats(user_id: number): Promise<import("./chats.entity").Chat[]>;
}
