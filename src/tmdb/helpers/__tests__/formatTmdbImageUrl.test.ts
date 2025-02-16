import { formatTmdbImageUrl } from '../formatTmdbImageUrl';

describe('formatTmdbImageUrl', () => {
  it('should return the formatted image URL', () => {
    const imageUrl = formatTmdbImageUrl<'backdrop'>(
      'original',
      '/path/to/image.jpg',
    );
    expect(imageUrl).toBe(
      'https://image.tmdb.org/t/p/original/path/to/image.jpg',
    );
  });

  it('should return the formatted image URL with a different size', () => {
    const imageUrl = formatTmdbImageUrl<'poster'>('w500', '/path/to/image.jpg');
    expect(imageUrl).toBe('https://image.tmdb.org/t/p/w500/path/to/image.jpg');
  });
});
