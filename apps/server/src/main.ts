import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { initializeDb } from 'db';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  await initializeDb();

  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}

bootstrap();
