import { Config } from '.';

export const config = (): Config => ({
  port: Number(process.env.PORT ?? 8080),
  tmdb: {
    baseUrl: process.env.TMDB_URL!,
    apiKey: process.env.TMDB_API_KEY!,
  },
});
