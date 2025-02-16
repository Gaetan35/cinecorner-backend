import fetchMock from 'fetch-mock';
import request from 'supertest';
import { app } from '../setup';
import * as getRandomNumberModule from '~shared/getRandomNumberInRange';

const mockedTmdbResponse = {
  page: 1,
  total_pages: 1,
  total_results: 2,
  results: [
    {
      id: 492606,
      title: 'Title',
      overview: 'Movie overview',
      poster_path: '/poster.jpg',
      backdrop_path: '/backdrop.jpg',
      release_date: '2019-05-26',
      genre_ids: [16, 14, 10752, 10770],
      media_type: 'movie',
      original_language: 'en',
    },
    {
      id: 591278,
      title: 'Title2',
      overview: 'Movie overview2',
      poster_path: '/poster2.jpg',
      backdrop_path: null,
      release_date: '',
      genre_ids: [99],
      media_type: 'movie',
      original_language: 'en',
    },
  ],
};

describe('/movie/highlight', () => {
  jest
    .spyOn(getRandomNumberModule, 'getRandomNumberInRange')
    .mockReturnValue(0);

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should return movie highlight from trending movies', async () => {
    fetchMock.get(
      'https://tmdb.api.com/trending/movie/day',
      mockedTmdbResponse,
      {
        name: 'trendingMoviesDay',
        query: {
          language: 'en-US',
        },
        headers: { Authorization: 'Bearer apiKey' },
      },
    );

    const response = await request(app.getHttpServer()).get('/movie/highlight');

    expect(response.status).toEqual(200);
    expect(response.body).toEqual({
      id: 492606,
      title: 'Title',
      overview: 'Movie overview',
      posterPath: 'https://image.tmdb.org/t/p/original/poster.jpg',
      backdropPath: 'https://image.tmdb.org/t/p/original/backdrop.jpg',
      releaseDate: '2019-05-26',
      genreIds: [16, 14, 10752, 10770],
    });

    expect(fetchMock.callHistory.called('trendingMoviesDay')).toBe(true);
  });

  it('should throw error if no trending movie is found for the day', async () => {
    fetchMock.get(
      'https://tmdb.api.com/trending/movie/day',
      {
        page: 1,
        total_pages: 1,
        total_results: 1,
        results: [],
      },
      {
        name: 'trendingMoviesDay',
        query: {
          language: 'en-US',
        },
        headers: { Authorization: 'Bearer apiKey' },
      },
    );

    const response = await request(app.getHttpServer()).get('/movie/highlight');

    expect(response.status).toEqual(404);
    expect(response.body).toEqual({
      error: 'Not Found',
      message: 'No trending movies found for today',
      statusCode: 404,
    });

    expect(fetchMock.callHistory.called('trendingMoviesDay')).toBe(true);
  });

  it('should throw error if TMDB call returns error', async () => {
    fetchMock.get(
      'https://tmdb.api.com/trending/movie/day',
      {
        status: 503,
        body: { message: 'Service Unavailable' },
      },
      {
        name: 'trendingMoviesDay',
        query: {
          language: 'en-US',
        },
        headers: { Authorization: 'Bearer apiKey' },
      },
    );

    const response = await request(app.getHttpServer()).get('/movie/highlight');

    expect(response.status).toEqual(503);
    expect(response.body).toEqual({
      message: 'TMDB API error: Service Unavailable',
      statusCode: 503,
    });

    expect(fetchMock.callHistory.called('trendingMoviesDay')).toBe(true);
  });
});
