import { Injectable, NotFoundException } from '@nestjs/common';

import { TmdbClient } from '~tmdb/tmdb.client';
import {
  GetTrendingMoviesParams,
  GetTrendingMoviesQueryParams,
  MovieSearchQueryParams,
} from './validation';
import { getRandomNumberInRange } from '~shared/getRandomNumberInRange';
import { tmdbMovieMapper } from './mappers/tmdbMovieMapper';

@Injectable()
export class MovieService {
  constructor(private readonly tmdbClient: TmdbClient) {}

  async search(params: MovieSearchQueryParams) {
    const { results, page, total_pages, total_results } =
      await this.tmdbClient.searchMovie({
        ...params,
        include_adult: false,
        language: 'en-US',
      });

    return {
      results: results.map(tmdbMovieMapper),
      page,
      totalPages: total_pages,
      totalResults: total_results,
    };
  }

  async getMovieHighlight() {
    const { results } = await this.tmdbClient.getTrendingMovies({
      timeWindow: 'day',
    });

    if (!results.length) {
      throw new NotFoundException('No trending movies found for today');
    }

    const highlightIndex = getRandomNumberInRange({ max: results.length - 1 });

    return tmdbMovieMapper(results[highlightIndex]);
  }

  async getTrendingMovies(
    params: GetTrendingMoviesQueryParams & GetTrendingMoviesParams,
  ) {
    const { results, page, total_pages, total_results } =
      await this.tmdbClient.getTrendingMovies(params);

    return {
      results: results.map(tmdbMovieMapper),
      page,
      totalPages: total_pages,
      totalResults: total_results,
    };
  }
}
