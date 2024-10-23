import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @HttpCode(HttpStatus.OK)
  @Post('find')
  signIn(@Body() signInDto: Record<string, any>) {
    return this.userService.findByName(signInDto.username);
  }
}
