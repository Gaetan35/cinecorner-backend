import { Controller, Get, Param, Query } from '@nestjs/common';
import { MovieService } from './movie.service';
import {
  GetMovieHighlightResponse,
  GetTrendingMoviesParams,
  GetTrendingMoviesQueryParams,
  GetTrendingMoviesResponse,
  MovieSearchQueryParams,
  MovieSearchResponse,
} from './schemas';
import { ApiNotFoundResponse } from '@nestjs/swagger';
import { ApiError } from '~shared/errors.schema';

@Controller('movie')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Get('/search')
  movieSearch(
    @Query() query: MovieSearchQueryParams,
  ): Promise<MovieSearchResponse> {
    return this.movieService.movieSearch(query);
  }

  @Get('/highlight')
  @ApiNotFoundResponse({
    description: 'No trending movies found for today',
    type: ApiError,
  })
  getMovieHighlight(): Promise<GetMovieHighlightResponse> {
    return this.movieService.getMovieHighlight();
  }

  @Get('/trending/:timeWindow')
  getTrendingMovies(
    @Query() { page, language }: GetTrendingMoviesQueryParams,
    @Param() { timeWindow }: GetTrendingMoviesParams,
  ): Promise<GetTrendingMoviesResponse> {
    return this.movieService.getTrendingMovies({ page, language, timeWindow });
  }
}
