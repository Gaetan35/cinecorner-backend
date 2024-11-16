export type Config = {
  port: number;
  tmdb: {
    baseUrl: string;
    apiKey: string;
  };
};

const config = (): Config => ({
  port: Number(process.env.PORT ?? 8080),
  tmdb: {
    baseUrl: process.env.TMDB_URL!,
    apiKey: process.env.TMDB_API_KEY!,
  },
});

const testConfig = (): Config => ({
  port: 8080,
  tmdb: {
    baseUrl: 'https://tmdb.api.com',
    apiKey: 'apiKey',
  },
});

export const loadConfig = () => {
  const env = process.env.NODE_ENV;
  return env === 'test' ? testConfig() : config();
};
