import { JwtService } from '@nestjs/jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService
  ) {}

  async signIn(credentials: {
    email: string;
    password: string;
  }): Promise<{ jwtToken: string }> {
    const user = await this.userService.findOne(credentials.email);
    if (user?.password !== credentials.password) {
      throw new UnauthorizedException();
    }
    const { user_id, email } = user;

    const payload = { sub: user_id, username: email };

    return {
      jwtToken: await this.jwtService.signAsync(payload),
    };
  }

  async register(credentials: {
    email: string;
    password: string;
  }): Promise<{ jwtToken: string }> {
    const user = await this.userService.findOne(credentials.email);
    if (user) {
      throw new UnauthorizedException('User already exists');
    }

    const payload = { sub: user.user_id, username: user.email };

    return {
      jwtToken: await this.jwtService.signAsync(payload),
    };
  }
}
