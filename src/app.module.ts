import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { SearchModule } from './search/search.module';
import { ConfigModule } from '@nestjs/config';
import { loadConfig } from './config';

@Module({
  imports: [SearchModule, ConfigModule.forRoot({ load: [loadConfig] })],
  controllers: [AppController],
})
export class AppModule {}
