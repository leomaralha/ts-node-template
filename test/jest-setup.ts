import { SetupServer } from '@src/server';
import supertest from 'supertest';

beforeAll(async () => {
  const server = new SetupServer();
  await server.init();
  global.testRequest = supertest(server.getApp());
});