import { App } from '@src/App';
import supertest from 'supertest';
import { DoneCallbalck } from './server';

beforeAll(async () => {
  const serverStartupConfig = { startListening: false };
  await App.up(serverStartupConfig);

  const server = App.server;
  const expressApp = server.getApp();
  global.testRequest = supertest(expressApp);
});

afterAll(async (onDone: DoneCallbalck) => {
  await App.down({onClose: onDone});
});
