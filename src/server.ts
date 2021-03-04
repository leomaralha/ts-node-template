import { Server } from '@overnightjs/core';
import { Application } from 'express';
import bodyParser from 'body-parser';
import Controllers from '@src/controllers/index';
import { IEnvSetup } from './@types/IEnvSetup';
import { Logger } from '@overnightjs/logger';
import { Server as HttpServer } from 'http';
import { sequelizeConnectionController } from '@src/middlewares/sequelizeConnectionController';
import { handleRequestError } from '@src/middlewares/handleRequestError';

type Port = string | number | undefined;
export type DoneCallbalck = (err?: Error) => void;
export class SetupServer extends Server implements IEnvSetup {
  private server!: HttpServer;
  /*
   * same as this.port = port, declaring as private here will
   * add the port variable to the SetupServer instance
   */
  constructor(private port: Port = 3000) {
    super();
  }

  public shutdown(onDone?: DoneCallbalck): void {
    if (this.server) this.server.close(onDone);
  }

  /*
   * We use a different method to init instead of using the constructor
   * this way we allow the server to be used in tests and normal initialization
   */
  public async init(startListening = true): Promise<void> {
    this.preSetupExpress();
    this.setupControllers();
    this.postSetupExpress();

    startListening ? this.startServer() : null;
  }

  private preSetupExpress(): void {
    this.app.use(bodyParser.json());
    this.setupControllers();
  }

  private postSetupExpress(): void {
    this.app.use(sequelizeConnectionController);
    this.app.use(handleRequestError);
  }

  private setupControllers(): void {
    for (const Controller of Controllers) {
      const controller = new Controller();
      this.addControllers(controller);
    }
  }

  private startServer() {
    this.server = this.app.listen(this.port, () => {
      Logger.Imp('Server listening on port: ' + this.port);
    });
  }

  public getApp(): Application {
    return this.app;
  }
}
