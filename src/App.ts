import { SetupServer } from './server';
import { SetupDatabase } from './database';
import {DoneCallbalck} from './server'

interface StartupConfiguration {
    startListening: boolean | undefined;
}

interface ShutdownConfiguration {
  onClose?: DoneCallbalck;
}

export class App {
  public static server = new SetupServer(process.env.NODE_PORT);
  public static database = new SetupDatabase(process.env.NODE_ENV as string);

  public static async up(config?: StartupConfiguration): Promise<void> {
    try {
      console.info('------SETUP DATABASE (STARTING)--------');
      await App.database.init();
      console.info('------SETUP DATABASE (COMPLETE)--------');

      console.info('------SETUP SERVER (STARTING)--------');
      await App.server.init(config?.startListening);
      console.info('------SETUP SERVER (COMPLETE)--------');
    } catch (error) {
      App.database.shutdown();
      App.server.shutdown();
    }
  }

  public static async down(config?: ShutdownConfiguration): Promise<void> {

    console.info('------CLOSE DATABASE (START)--------');
    App.database.shutdown();
    console.info('------CLOSE DATABASE (COMPLETE)--------');

    console.info('------CLOSE SERVER (START)--------');
    App.server.shutdown(config?.onClose);
    console.info('------CLOSE SERVER (COMPLETE)--------');

  }
}
