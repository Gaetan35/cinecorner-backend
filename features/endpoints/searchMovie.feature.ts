import { app } from 'features/setup';
import fetchMock from 'fetch-mock';
import request from 'supertest';

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
    },
    {
      id: 591278,
      title: 'Title2',
      overview: 'Movie overview2',
      poster_path: '/poster2.jpg',
      backdrop_path: null,
      release_date: '',
      genre_ids: [99],
    },
  ],
};

describe('/search', () => {
  it('should return mapped response from TMDB', async () => {
    fetchMock.get('https://tmdb.api.com/search/movie', mockedTmdbResponse, {
      name: 'movieSearch',
      query: {
        query: 'TheMatrix',
        page: '1',
        include_adult: 'false',
        language: 'en-US',
      },
      headers: { Authorization: 'Bearer apiKey' },
    });

    const response = await request(app.getHttpServer()).get(
      '/movie?query=TheMatrix&page=1',
    );

    expect(response.status).toEqual(200);
    expect(response.body).toEqual({
      page: 1,
      totalPages: 1,
      totalResults: 2,
      results: [
        {
          id: 492606,
          title: 'Title',
          overview: 'Movie overview',
          posterPath: 'https://image.tmdb.org/t/p/original/poster.jpg',
          backdropPath: 'https://image.tmdb.org/t/p/original/backdrop.jpg',
          releaseDate: '2019-05-26',
          genreIds: [16, 14, 10752, 10770],
        },
        {
          id: 591278,
          title: 'Title2',
          overview: 'Movie overview2',
          posterPath: 'https://image.tmdb.org/t/p/original/poster2.jpg',
          backdropPath: null,
          releaseDate: null,
          genreIds: [99],
        },
      ],
    });

    expect(fetchMock.callHistory.called('movieSearch')).toBe(true);
  });

  it('should return empty array when no result', async () => {
    const mockedTmdbResponse = {
      page: 1,
      total_pages: 1,
      total_results: 0,
      results: [],
    };

    fetchMock.get('https://tmdb.api.com/search/movie', mockedTmdbResponse, {
      name: 'movieSearch',
      query: {
        query: 'TheMatrix',
        page: '1',
        include_adult: 'false',
        language: 'en-US',
      },
      headers: { Authorization: 'Bearer apiKey' },
    });

    const response = await request(app.getHttpServer()).get(
      '/movie?query=TheMatrix&page=1',
    );

    expect(response.status).toEqual(200);
    expect(response.body).toEqual({
      page: 1,
      totalPages: 1,
      totalResults: 0,
      results: [],
    });

    expect(fetchMock.callHistory.called('movieSearch')).toBe(true);
  });
});
