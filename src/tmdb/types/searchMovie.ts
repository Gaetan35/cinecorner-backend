import { PaginatedResponse, TmdbMovie } from './common';

export type SearchMovieRequest = {
  query: string;
  page: number;
  include_adult?: boolean;
  language?: string;
};

export type SearchMovieResponse = PaginatedResponse<TmdbMovie>;
