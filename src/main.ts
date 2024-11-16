import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Config } from './config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.enableCors();

  const configService = app.get(ConfigService<Config, true>);
  const port = configService.get('port', { infer: true });

  await app.listen(port);
  console.log(`Application is running on port ${port}`);
}

bootstrap();
