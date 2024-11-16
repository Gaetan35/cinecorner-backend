import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import fetchMock from 'fetch-mock';
import { AppModule } from '~/app.module';

fetchMock.mockGlobal();

export let app: INestApplication;

beforeAll(async () => {
  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();

  app = moduleFixture.createNestApplication();
  await app.init();
});

beforeEach(() => {
  fetchMock.clearHistory();
  fetchMock.removeRoutes();
});

afterAll(async () => {
  await app.close();
});
