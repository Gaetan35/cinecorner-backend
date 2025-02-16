import { Controller, Get, Param, Query } from '@nestjs/common';
import { MovieService } from './movie.service';
import { Movie, PaginatedList } from './types';
import {
  GetTrendingMoviesParams,
  GetTrendingMoviesQueryParams,
  MovieSearchQueryParams,
} from './validation';

@Controller('movie')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Get()
  search(
    @Query() query: MovieSearchQueryParams,
  ): Promise<PaginatedList<Movie>> {
    return this.movieService.search(query);
  }

  @Get('/highlight')
  getMovieHighlight(): Promise<Movie> {
    return this.movieService.getMovieHighlight();
  }

  @Get('/trending/:timeWindow')
  getTrendingMovies(
    @Query() { page, language }: GetTrendingMoviesQueryParams,
    @Param() { timeWindow }: GetTrendingMoviesParams,
  ): Promise<PaginatedList<Movie>> {
    return this.movieService.getTrendingMovies({ page, language, timeWindow });
  }
}
