import { Module } from '@nestjs/common';
import { SearchController } from './search.controller';
import { SearchService } from './search.service';
import { TmdbModule } from '~/tmdb/tmdb.module';

@Module({
  controllers: [SearchController],
  providers: [SearchService],
  imports: [TmdbModule],
})
export class SearchModule {}
