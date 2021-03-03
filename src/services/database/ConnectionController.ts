import { IGetConnection } from '@src/@types/IGetConnection';
import { Sequelize } from 'sequelize';
import * as models from '@src/database/models';
import { AssociableModel, ModelCollection } from '@src/@types/sequelize';
import { logger } from '@src/utils/database/logger';

class ConnectionController {
  private sequelize!: Sequelize;
  constructor(private connHanlder: IGetConnection) {}

  public async initSequelize(companyName: string): Promise<Sequelize> {
    const { uri: databaseURI } = await this.connHanlder.getDbCredentials(
      companyName
    );
    const sequelize = new Sequelize(databaseURI, { dialect: 'postgres', logging:  logger});
    this.sequelize = sequelize;

    const modelArray = models.toArray();
    this.defineModels(modelArray);
    this.defineAssociations(modelArray);

    return sequelize;
  }

  public endConnection(): Promise<void> {
    return this.sequelize.close();
  }

  private defineModels(models: AssociableModel[]): void {
    models.forEach((Model) => Model.Factory(this.sequelize));
  }

  private defineAssociations(models: AssociableModel[]) {
    const instanceModels = this.sequelize.models as ModelCollection;
    models.forEach((Model) => Model.associate(instanceModels));
  }
}

export { ConnectionController };
