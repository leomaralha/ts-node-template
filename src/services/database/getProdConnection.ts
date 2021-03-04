import {
  IGetConnection,
  DatabaseAuthCredentials,
} from '@src/@types/IGetConnection';

class GetProdConnection implements IGetConnection {
  async getDbCredentials(
    companyName: string
  ): Promise<DatabaseAuthCredentials> {
    console.log(companyName);
    return {
      uri: 'test',
      host: 'test',
      database: 'test',
      password: 'test',
      dialect: 'postgres',
    };
  }
}

export const prodConnection = new GetProdConnection();