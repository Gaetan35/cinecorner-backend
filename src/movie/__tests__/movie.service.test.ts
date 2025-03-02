import { Test, TestingModule } from '@nestjs/testing';
import { MovieService } from '../movie.service';
import { NotFoundException } from '@nestjs/common';
import { TmdbClient } from '~tmdb/tmdb.client';
import * as getRandomNumberModule from '~shared/getRandomNumberInRange';

describe('MovieService', () => {
  let service: MovieService;

  const mockTmdbClient = {
    searchMovie: jest.fn(),
    getTrendingMovies: jest.fn(),
    getMovieHighlight: jest.fn(),
  };

  const mockGetRandomNumberInRange = jest.spyOn(
    getRandomNumberModule,
    'getRandomNumberInRange',
  );

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MovieService,
        {
          provide: TmdbClient,
          useValue: mockTmdbClient,
        },
      ],
    }).compile();

    service = module.get<MovieService>(MovieService);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('search', () => {
    it('should call tmdb with correct params', async () => {
      mockTmdbClient.searchMovie.mockResolvedValueOnce({
        page: 1,
        total_pages: 1,
        total_results: 2,
        results: [],
      });
      const result = await service.movieSearch({
        query: 'Interstellar',
        page: 1,
      });

      expect(mockTmdbClient.searchMovie).toHaveBeenCalledWith({
        query: 'Interstellar',
        page: 1,
        include_adult: false,
        language: 'en-US',
      });
      expect(result).toEqual({
        results: [],
        page: 1,
        totalPages: 1,
        totalResults: 2,
      });
    });

    it('should throw error if searchMovie returns error', async () => {
      mockTmdbClient.searchMovie.mockRejectedValueOnce(
        new Error('searchMovie error'),
      );

      await expect(
        service.movieSearch({ query: 'Interstellar', page: 1 }),
      ).rejects.toThrow(new Error('searchMovie error'));
    });
  });

  describe('getMovieHighlight', () => {
    it('should randomly select a trending movie of the day', async () => {
      mockTmdbClient.getTrendingMovies.mockResolvedValueOnce({
        results: [
          { title: 'movie1' },
          { title: 'movie2' },
          { title: 'movie3' },
        ],
      });
      mockGetRandomNumberInRange.mockReturnValueOnce(1);

      const result = await service.getMovieHighlight();

      expect(mockTmdbClient.getTrendingMovies).toHaveBeenCalledWith({
        timeWindow: 'day',
      });

      expect(result).toMatchObject({ title: 'movie2' });
    });

    it('should return 404 if there are no trending movies of the day', async () => {
      mockTmdbClient.getTrendingMovies.mockResolvedValueOnce({
        results: [],
      });
      await expect(service.getMovieHighlight()).rejects.toThrow(
        NotFoundException,
      );

      expect(mockTmdbClient.getTrendingMovies).toHaveBeenCalledWith({
        timeWindow: 'day',
      });
    });

    it('should throw error if getMovieHighlight returns error', async () => {
      mockTmdbClient.getTrendingMovies.mockRejectedValueOnce(
        new Error('getMovieHighlightError'),
      );
      await expect(service.getMovieHighlight()).rejects.toThrow(
        new Error('getMovieHighlightError'),
      );

      expect(mockTmdbClient.getTrendingMovies).toHaveBeenCalledWith({
        timeWindow: 'day',
      });
    });
  });

  describe('getTrendingMovies', () => {
    it('should call tmdb with correct params', async () => {
      mockTmdbClient.getTrendingMovies.mockResolvedValueOnce({
        page: 1,
        total_pages: 1,
        total_results: 2,
        results: [],
      });
      const params = { timeWindow: 'day', language: 'en', page: 1 } as const;
      const result = await service.getTrendingMovies(params);

      expect(result).toEqual({
        page: 1,
        totalPages: 1,
        totalResults: 2,
        results: [],
      });
      expect(mockTmdbClient.getTrendingMovies).toHaveBeenCalledWith(params);
    });

    it('should throw error if getTrendingMovies returns error', async () => {
      mockTmdbClient.getTrendingMovies.mockRejectedValueOnce(
        new Error('getTrendingMovies error'),
      );

      await expect(
        service.getTrendingMovies({
          timeWindow: 'day',
          language: 'en',
          page: 1,
        }),
      ).rejects.toThrow(new Error('getTrendingMovies error'));
    });
  });
});
