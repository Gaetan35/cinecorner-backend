import { Type } from 'class-transformer';
import { IsIn, IsInt, IsOptional, IsString, Min } from 'class-validator';

export class GetTrendingMoviesQueryParams {
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page: number;

  @IsString()
  @IsOptional()
  language: string;
}

export class GetTrendingMoviesParams {
  @IsIn(['day', 'week'])
  timeWindow: 'day' | 'week';
}
