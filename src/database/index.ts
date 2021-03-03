import * as models from './models';
import { connGetter } from '@src/services/database/getConnectionStrategy';
import { ConnectionController } from '@src/services/database/ConnectionController';
import { IEnvSetup } from '@src/@types/IEnvSetup';

export class SetupDatabase implements IEnvSetup {

  constructor(private enviroment: (string | null)){}

  async init(): Promise<void> {
    if (this.enviroment === 'development') {
      const conn = new ConnectionController(connGetter);
      const sequelize = await conn.initSequelize(this.enviroment);

      await sequelize.sync();
      await sequelize.close();
    }
  }
  shutdown(reason: Error): void {
    console.error(reason);
  }
}
