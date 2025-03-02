import { Injectable, NotFoundException } from '@nestjs/common';

import { TmdbClient } from '~tmdb/tmdb.client';
import {
  GetMovieHighlightResponse,
  GetTrendingMoviesParams,
  GetTrendingMoviesQueryParams,
  GetTrendingMoviesResponse,
  MovieSearchQueryParams,
  MovieSearchResponse,
} from './schemas';
import { getRandomNumberInRange } from '~shared/getRandomNumberInRange';
import { tmdbMovieMapper } from './mappers/tmdbMovieMapper';

@Injectable()
export class MovieService {
  constructor(private readonly tmdbClient: TmdbClient) {}

  async movieSearch(
    params: MovieSearchQueryParams,
  ): Promise<MovieSearchResponse> {
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

  async getMovieHighlight(): Promise<GetMovieHighlightResponse> {
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
  ): Promise<GetTrendingMoviesResponse> {
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
