import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { MovieModule } from './movie/movie.module';
import { ConfigModule } from '@nestjs/config';
import { loadConfig } from './config';

@Module({
  imports: [MovieModule, ConfigModule.forRoot({ load: [loadConfig] })],
  controllers: [AppController],
})
export class AppModule {}
