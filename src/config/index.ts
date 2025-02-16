import { config } from './defaultConfig';
import { testConfig } from './testConfig';

export type Config = {
  port: number;
  tmdb: {
    baseUrl: string;
    apiKey: string;
  };
};

export const loadConfig = (env = process.env.NODE_ENV) =>
  env === 'test' ? testConfig() : config();
