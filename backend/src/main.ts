import { HttpStatus, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {cors: true});
  app.setGlobalPrefix('/api')
  app.useGlobalPipes(new ValidationPipe({
    errorHttpStatusCode: HttpStatus.FORBIDDEN
  }));
  await app.listen(process.env.SERVICE_PORT);
}

bootstrap();
