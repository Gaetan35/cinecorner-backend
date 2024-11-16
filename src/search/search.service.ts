import { Injectable } from '@nestjs/common';
import { SearchQueryParams } from './types/searchQueryParams';
import { TmdbClient } from '~/tmdb/tmdb.client';
import { formatTmdbImageUrl } from '~/tmdb/formatTmdbImageUrl';

@Injectable()
export class SearchService {
  constructor(private readonly tmdbClient: TmdbClient) {}

  async search(params: SearchQueryParams) {
    const { results, page, total_pages, total_results } =
      await this.tmdbClient.searchMovie({
        ...params,
        include_adult: false,
        language: 'en-US',
      });

    return {
      movies: results.map((movie) => ({
        id: movie.id,
        title: movie.title,
        overview: movie.overview,
        posterPath: movie.poster_path
          ? formatTmdbImageUrl<'poster'>('original', movie.poster_path)
          : null,
        backdropPath: movie.backdrop_path
          ? formatTmdbImageUrl<'backdrop'>('original', movie.backdrop_path)
          : null,
        releaseDate: movie.release_date || null,
        genreIds: movie.genre_ids,
      })),
      page,
      totalPages: total_pages,
      totalResults: total_results,
    };
  }
}
