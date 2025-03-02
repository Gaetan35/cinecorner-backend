import { MovieEntity } from '~movie/types';
import { formatTmdbImageUrl } from '~tmdb/helpers';
import { TmdbMovie } from '~tmdb/types/common';

export const tmdbMovieMapper = (movie: TmdbMovie): MovieEntity => ({
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
});
