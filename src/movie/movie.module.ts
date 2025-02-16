import { Module } from '@nestjs/common';
import { MovieController } from './movie.controller';
import { MovieService } from './movie.service';
import { TmdbModule } from '~tmdb/tmdb.module';

@Module({
  controllers: [MovieController],
  providers: [MovieService],
  imports: [TmdbModule],
})
export class MovieModule {}
