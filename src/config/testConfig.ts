import { Config } from '.';

export const testConfig = (): Config => ({
  port: 8000,
  tmdb: {
    baseUrl: 'https://tmdb.api.com',
    apiKey: 'apiKey',
  },
});
