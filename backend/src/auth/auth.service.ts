import { JwtService } from '@nestjs/jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { CreateUserDto } from './registration.dto';
import { User } from 'src/users/users.entity';

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

    const payload = { sub: user_id, email: email };

    return {
      jwtToken: await this.jwtService.signAsync(payload),
    };
  }

  async register(credentials: CreateUserDto): Promise<{ jwtToken: string }> {
    let user = await this.userService.findOne(credentials.email);
    if (user) {
      throw new UnauthorizedException('User already exists');
    }

    user = await this.userService.create(credentials);

    const payload = { sub: user.user_id, email: user.email };
    return {
      jwtToken: await this.jwtService.signAsync(payload),
    };
  }

  async getProfile(req: any): Promise<{ user: User }> {
    const user = await this.userService.findOne(req.user.email);
    if (!user) {
      throw new UnauthorizedException('No user found');
    }
    return {
      user,
    };
  }
}
