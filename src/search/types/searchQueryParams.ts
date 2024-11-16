import { Type } from 'class-transformer';
import { IsInt, IsString, Min } from 'class-validator';

export class SearchQueryParams {
  @IsString()
  query: string;

  @Type(() => Number)
  @IsInt()
  @Min(1)
  page: number;
}
