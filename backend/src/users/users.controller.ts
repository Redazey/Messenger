import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Res,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { Response } from 'express';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @HttpCode(HttpStatus.OK)
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
