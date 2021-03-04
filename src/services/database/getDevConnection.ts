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
      password: 'q55324',
      dialect: 'postgres',
      uri: 'postgres://postgres:q55324@db:5432/db',
    };
  }
}

export const devConnection = new GetDevConnection();