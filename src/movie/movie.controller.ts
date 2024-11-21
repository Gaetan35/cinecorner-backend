import { Controller, Get, Query } from '@nestjs/common';
import { MovieService } from './movie.service';
import { MovieSearchQueryParams } from './types/movieSearchQueryParams';

@Controller('movie')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Get()
  search(@Query() query: MovieSearchQueryParams) {
    return this.movieService.search(query);
  }
}
