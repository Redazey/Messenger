import { Inject, Injectable } from '@nestjs/common';
import { User } from './users.entity';

@Injectable()
export class UsersService {
  constructor(
    @Inject('USERS_REPOSITORY')
    private users: typeof User
  ) {}

  async findOne(email: string): Promise<User | undefined> {
    return this.users.findOne({
      where: {
        email: email,
      },
    });
  }

  async create(credentials: {
    username: string;
    email: string;
    password: string;
  }): Promise<User | undefined> {
    return this.users.create(credentials);
  }
}
