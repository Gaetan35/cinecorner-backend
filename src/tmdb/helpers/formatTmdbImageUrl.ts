const imageConfiguration = {
  secureBaseUrl: 'https://image.tmdb.org/t/p/',
  sizes: {
    backdrop: ['w300', 'w780', 'w1280', 'original'],
    logo: ['w45', 'w92', 'w154', 'w185', 'w300', 'w500', 'original'],
    poster: ['w92', 'w154', 'w185', 'w342', 'w500', 'w780', 'original'],
    profile: ['w45', 'w185', 'h632', 'original'],
    still: ['w92', 'w185', 'w300', 'original'],
  },
} as const;

export const formatTmdbImageUrl = <
  ImageType extends keyof typeof imageConfiguration.sizes,
>(
  size: (typeof imageConfiguration.sizes)[ImageType][number],
  path: string,
) => `${imageConfiguration.secureBaseUrl}${size}${path}`;
