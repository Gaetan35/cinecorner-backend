import { Injectable } from '@nestjs/common';
import { SearchMovieParams, SearchMovieResponse } from './types';
import { Config } from '~/config';
import { ConfigService } from '@nestjs/config';
import qs from 'qs';

@Injectable()
export class TmdbClient {
  constructor(private readonly configService: ConfigService<Config, true>) {}

  private readonly baseUrl = this.configService.get('tmdb.baseUrl', {
    infer: true,
  });
  private readonly apiKey = this.configService.get('tmdb.apiKey', {
    infer: true,
  });

  private routes = {
    searchMovie: (queryParams: SearchMovieParams) =>
      `${this.baseUrl}/search/movie?${qs.stringify(queryParams)}`,
  };

  async searchMovie(query: SearchMovieParams): Promise<SearchMovieResponse> {
    const response = await fetch(this.routes.searchMovie(query), {
      headers: { Authorization: `Bearer ${this.apiKey}` },
    });

    return response.json();
  }
}
