import { Inject, Injectable } from '@nestjs/common';
import { Chat } from './chats.entity';
import { UsersChats } from '../users_chats/users_chats.entity';
import { CreateChatDto } from './createChat.dto';

@Injectable()
export class ChatsService {
  constructor(
    @Inject('CHATS_REPOSITORY') private chat: typeof Chat,
    @Inject('USERS_CHATS_REPOSITORY') private users_chats: typeof UsersChats
  ) {}

  async findAll(user_id: number): Promise<Chat[] | undefined> {
    const userChats = await this.chat.findAll({
      include: [
        {
          model: UsersChats,
          attributes: ['user_id', 'chat_id', 'entered_at'],
          where: {
            user_id: user_id,
          },
        },
      ],
    });
    if (!userChats || userChats.length === 0) {
      return undefined;
    }
    return userChats;
  }

  async create(credentials: CreateChatDto): Promise<Chat | undefined> {
    const Chat = await this.chat.create({ chat_name: credentials.chat_name });

    credentials.participants.forEach(id => {
      this.users_chats.create({ chat_id: Chat.chat_id, user_id: id });
    });

    return Chat;
  }
}
