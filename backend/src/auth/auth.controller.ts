import { Body, Controller, Get, Post, Request, Res } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { CreateUserDto } from './registration.dto';
import { Public } from 'src/common/decorators/public.decorator';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('login')
  async signIn(
    @Res({ passthrough: true }) res: Response,
    @Body() signInDto: Record<string, any>
  ) {
    const { jwtToken } = await this.authService.signIn({
      email: signInDto.email,
      password: signInDto.password,
    });
    res.cookie('auth-token', jwtToken);
    console.log(jwtToken);
    res.send({ jwtToken });
  }

  @Public()
  @Post('register')
  register(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }

  @Get('profile')
  getProfile(@Request() req) {
    return this.authService.getProfile(req);
  }
}
