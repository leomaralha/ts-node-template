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
      database: 'test',
      host: 'test',
      password: 'test',
      uri: 'test',
    };
  }
}

export const prodConnection = new GetProdConnection();