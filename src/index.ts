import './utils/module-alias';
import { SetupServer } from './server';
import { SetupDatabase } from './database';

async function startServer() {
  const server = new SetupServer(process.env.NODE_PORT);
  const database = new SetupDatabase(process.env.NODE_ENV as string);
  try {

    console.info("------SETUP DATABASE (STARTING)--------");
    await database.init();
    console.info("------SETUP DATABASE (COMPLETE)--------");


    console.info("------SETUP SERVER (STARTING)--------");
    await server.init();
    console.info("------SETUP SERVER (COMPLETE)--------");

  } catch (error) {
    database.shutdown(error);
    server.shutdown(error);
  }
}

startServer();
