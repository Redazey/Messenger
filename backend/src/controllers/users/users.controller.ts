import {
  Controller,
  Get,
  Param,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { User } from 'src/models/users.model';

@Controller('users')
export class UserController {
  @Get(':user_id')
  async getUserById(@Param('user_id') user_id: number): Promise<User> {
    try {
      const user = await User.findByPk(user_id);

      if (!user) {
        throw new NotFoundException('User not found');
      }

      return user;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}

@Controller('users')
export class UsersController {
  async getAllUsers(): Promise<User[]> {
    try {
      const user = await User.findAll();

      if (!user) {
        throw new NotFoundException('Users not found');
      }

      return user;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
