import { Type } from 'class-transformer';
import { IsInt, IsString, Min } from 'class-validator';
import { PaginatedMovieList } from './shared.schema';

export class MovieSearchQueryParams {
  @IsString()
  query: string;

  @Type(() => Number)
  @IsInt()
  @Min(1)
  page: number;
}

export class MovieSearchResponse extends PaginatedMovieList {}
