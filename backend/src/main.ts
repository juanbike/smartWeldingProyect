/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config } from 'dotenv';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  config();
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe()); // Activa la validadción global para los campos en las entidades y dtos

  app.enableCors();

  await app.listen(3500);
}
bootstrap();
