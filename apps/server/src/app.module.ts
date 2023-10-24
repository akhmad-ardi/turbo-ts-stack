import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { TaskModule } from './task/task.module';
import { AuthGuard } from './auth/auth.guard';

@Module({
  imports: [
    UserModule,
    AuthModule,
    TaskModule,
    JwtModule,
    ConfigModule.forRoot(),
  ],
  providers: [{ provide: APP_GUARD, useClass: AuthGuard }],
})
export class AppModule {}
