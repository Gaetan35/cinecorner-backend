import { HttpException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import qs from 'qs';
import {
  GetTrendingMovieRequest,
  GetTrendingMovieResponse,
  SearchMovieRequest,
  SearchMovieResponse,
} from './types';
import { Config } from '~config/index';

@Injectable()
export class TmdbClient {
  constructor(private readonly configService: ConfigService<Config, true>) {}

  private readonly baseUrl = this.configService.get('tmdb.baseUrl', {
    infer: true,
  });
  private readonly apiKey = this.configService.get('tmdb.apiKey', {
    infer: true,
  });

  private async sendRequest<T>(url: string): Promise<T> {
    const response = await fetch(url, {
      headers: { Authorization: `Bearer ${this.apiKey}` },
    });

    if (!response.ok) {
      throw new HttpException(
        `TMDB API error: ${response.statusText}`,
        response.status,
      );
    }

    return await response.json();
  }

  searchMovie(params: SearchMovieRequest) {
    return this.sendRequest<SearchMovieResponse>(
      `${this.baseUrl}/search/movie?${qs.stringify(params)}`,
    );
  }

  getTrendingMovies({
    timeWindow,
    language = 'en-US',
    page = 1,
  }: GetTrendingMovieRequest) {
    return this.sendRequest<GetTrendingMovieResponse>(
      `${this.baseUrl}/trending/movie/${timeWindow}?${qs.stringify({ language, page })}`,
    );
  }
}
