import {
  IGetConnection,
  DatabaseAuthCredentials,
} from '@src/@types/IGetConnection';

class GetDevConnection implements IGetConnection {
  async getDbCredentials(
    companyName: string
  ): Promise<DatabaseAuthCredentials> {
    console.log(companyName);
    return {
      host: 'db',
      database: 'db',
      dialect: 'sqlite',
      password: 'q55324',
      uri: 'sqlite::memory:',
    };
  }
}

export const devConnection = new GetDevConnection();
