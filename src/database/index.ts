import { connGetter } from '@src/services/database/getConnectionStrategy';
import { ConnectionController } from '@src/services/database/ConnectionController';
import { IEnvSetup } from '@src/@types/IEnvSetup';

export class SetupDatabase implements IEnvSetup {
  constructor(private enviroment: string | null) {}

  /*
   * If you need to comunicate with just one Database 
   * remove the sentence "await sequelize.close();" 
   * from the code bellow on the init method
   */

  async init(): Promise<void> {
    if (this.enviroment === 'development') {
      const conn = new ConnectionController(connGetter);
      const sequelize = await conn.initSequelize(this.enviroment);

      await sequelize.sync({ alter: true, force: true });
      await sequelize.close();
    }
  }
  shutdown(reason?: Error): void {
    console.error(reason);
  }
}
