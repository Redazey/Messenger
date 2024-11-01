import { Inject, Injectable } from '@nestjs/common';
import { User } from './users.entity';
import { Op } from 'sequelize';
import { UsersChats } from 'src/users_chats/users_chats.entity';

@Injectable()
export class UsersService {
  constructor(
    @Inject('USERS_REPOSITORY')
    private users: typeof User,
    @Inject('USERS_REPOSITORY')
    private user_chats: typeof UsersChats
  ) {}

  async findOne(email: string): Promise<User | undefined> {
    return await this.users.findOne({
      where: {
        email: email,
      },
    });
  }

  async findByName(username: string): Promise<User[] | undefined> {
    return await this.users.findAll({
      attributes: ['user_id', 'username'],
      where: {
        username: {
          [Op.iLike]: `%${username}%`,
        },
      },
    });
  }

  async findByChat(chat_id: number): Promise<User[] | undefined> {
    return await this.users.findAll({
      attributes: ['user_id', 'username'],
      include: {
        model: UsersChats,
        where: {
          chat_id: chat_id,
        },
      },
    });
  }

  async create(credentials: {
    username: string;
    email: string;
    password: string;
  }): Promise<User | undefined> {
    return await this.users.create(credentials);
  }
}
