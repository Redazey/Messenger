import { Body, Controller, Post, Res } from '@nestjs/common';
import { UsersService } from './users.service';
import { Response } from 'express';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Post('find')
  signIn(@Body() signInDto: Record<string, any>) {
    return this.userService.findByName(signInDto.username);
  }

  @Post('logout')
  logout(@Res() res: Response) {
    res.clearCookie('jwt-token');
    res.sendStatus(401);
  }
}
