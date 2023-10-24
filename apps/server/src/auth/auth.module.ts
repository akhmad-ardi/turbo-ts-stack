import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { UserModule } from 'src/user/user.module';
import { UserService } from 'src/user/user.service';

@Module({
  imports: [UserModule, JwtModule],
  controllers: [AuthController],
  providers: [AuthService, UserService, JwtService],
  exports: [AuthService],
})
export class AuthModule {}
