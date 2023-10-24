import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserService } from 'src/user/user.service';
import { SignInDto } from 'dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn(SignInDto: SignInDto) {
    const user = await this.userService.findOneByEmail(SignInDto.email);
    if (!user) return new Error('user not found');

    const passwordCheck = bcrypt.compareSync(SignInDto.password, user.password);

    if (!passwordCheck) return new Error('email or password is invalid');

    return {
      access_token: await this.jwtService.signAsync(
        {
          sub: user.id,
          username: user.username,
        },
        { secret: process.env.SECRET_TOKEN, expiresIn: '1d' },
      ),
    };
  }
}
