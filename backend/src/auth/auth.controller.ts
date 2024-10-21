import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { CreateUserDto } from './registration.dto';
import { Public } from 'src/common/decorators/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Public()
  @Post('login')
  signIn(@Body() signInDto: Record<string, any>) {
    return this.authService.signIn({
      email: signInDto.username,
      password: signInDto.password,
    });
  }

  @Public()
  @Post('register')
  regoster(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }
}
