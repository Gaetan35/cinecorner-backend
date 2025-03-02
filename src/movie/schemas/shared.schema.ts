export class Movie {
  id: number;
  title: string;
  overview: string;
  posterPath: string | null;
  backdropPath: string | null;
  releaseDate: string | null;
  genreIds: number[];
}

export class PaginatedMovieList {
  page: number;
  totalPages: number;
  totalResults: number;
  results: Movie[];
}
