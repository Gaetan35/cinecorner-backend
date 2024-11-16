import { Module } from '@nestjs/common';
import { TmdbClient } from './tmdb.client';
import { ConfigModule } from '@nestjs/config';

@Module({
  providers: [TmdbClient],
  exports: [TmdbClient],
  imports: [ConfigModule],
})
export class TmdbModule {}
