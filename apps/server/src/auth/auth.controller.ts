import { Body, Controller, Post, Res, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from 'dto';
import { Public } from 'src/lib/Public.decorator';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('sign-in')
  async SignIn(@Body() signInDto: SignInDto, @Res() res: Response) {
    try {
      const token = await this.authService.signIn(signInDto);
      if (token instanceof Error) throw token;

      res.cookie('token', token.access_token);
      res.json({ code: 201, message: 'authenticated' });
    } catch (error) {
      if (error instanceof Error)
        res.json({ code: 400, message: error.message });

      console.log(error);
      res.json('something error');
    }
  }

  @Delete()
  async SignOut(@Res() res: Response) {
    return res
      .clearCookie('token')
      .json({ code: 200, message: 'not authenticate' });
  }
}
