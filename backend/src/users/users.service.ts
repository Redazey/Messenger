import { Inject, Injectable } from '@nestjs/common';
import { User } from './users.entity';
import { Op } from 'sequelize';

@Injectable()
export class UsersService {
  constructor(
    @Inject('USERS_REPOSITORY')
    private users: typeof User
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

  async create(credentials: {
    username: string;
    email: string;
    password: string;
  }): Promise<User | undefined> {
    return await this.users.create(credentials);
  }
}
