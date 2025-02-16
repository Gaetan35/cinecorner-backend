import { tmdbMovieMapper } from '../tmdbMovieMapper';

describe('tmdbMovieMapper', () => {
  it('should return the formatted image URL', () => {
    const tmdbMovie = {
      adult: false,
      backdrop_path: '/backdrop.jpg',
      genre_ids: [16, 14, 10752, 10770],
      id: 492606,
      original_language: 'en',
      original_title: 'Original Title',
      overview: 'Movie overview',
      popularity: 343.513,
      poster_path: '/poster.jpg',
      release_date: '2019-05-26',
      title: 'Title',
      video: false,
      vote_average: 8.4,
      vote_count: 36367,
    };

    const result = tmdbMovieMapper(tmdbMovie);

    expect(result).toEqual({
      id: 492606,
      title: 'Title',
      overview: 'Movie overview',
      posterPath: 'https://image.tmdb.org/t/p/original/poster.jpg',
      backdropPath: 'https://image.tmdb.org/t/p/original/backdrop.jpg',
      releaseDate: '2019-05-26',
      genreIds: [16, 14, 10752, 10770],
    });
  });

  it('should return the formatted image URL with null for image paths', () => {
    const tmdbMovie = {
      adult: false,
      backdrop_path: null,
      genre_ids: [16, 14, 10752, 10770],
      id: 492606,
      original_language: 'en',
      original_title: 'Original Title',
      overview: 'Movie overview',
      popularity: 343.513,
      poster_path: null,
      release_date: '2019-05-26',
      title: 'Title',
      video: false,
      vote_average: 8.4,
      vote_count: 36367,
    };

    const result = tmdbMovieMapper(tmdbMovie);

    expect(result).toEqual({
      id: 492606,
      title: 'Title',
      overview: 'Movie overview',
      posterPath: null,
      backdropPath: null,
      releaseDate: '2019-05-26',
      genreIds: [16, 14, 10752, 10770],
    });
  });
});
