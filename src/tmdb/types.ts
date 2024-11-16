export type SearchMovieParams = {
  query: string;
  page: number;
  include_adult?: boolean;
  language?: string;
};

type SearchMovieResult = {
  adult: boolean;
  backdrop_path: string | null;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  // release date can be empty string
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};

export type SearchMovieResponse = {
  page: number;
  total_pages: number;
  total_results: number;
  results: SearchMovieResult[];
};
