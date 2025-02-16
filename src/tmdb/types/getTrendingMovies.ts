import { PaginatedResponse, TmdbMovie } from './common';

export type GetTrendingMovieRequest = {
  timeWindow: 'day' | 'week';
  language?: string;
  page?: number;
};

export type GetTrendingMovieResponse = PaginatedResponse<
  TmdbMovie & { media_type: 'movie' }
>;
