import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Config } from './config';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.enableCors();

  const configService = app.get(ConfigService<Config, true>);
  const port = configService.get('port', { infer: true });

  const config = new DocumentBuilder()
    .setTitle('Cinecorner')
    .setDescription("OpenAPI description for Cinecorner's backend")
    .setVersion('1.0')
    .build();

  SwaggerModule.setup('api', app, () =>
    SwaggerModule.createDocument(app, config),
  );

  await app.listen(port);
  console.log(`Application is running on port ${port}`);
}

bootstrap();
