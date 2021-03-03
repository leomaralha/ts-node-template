import * as http from 'http';
import { User } from '@src/database/models/User';
import { Model, ModelCtor, Sequelize } from 'sequelize/types';

// module augmentation
declare module 'express-serve-static-core' {
  export interface Request extends http.IncomingMessage, Express.Request {
    context?: {
      user: User;
    };
    models: {
      [key: string]: ModelCtor<Model>;
    };
    sequelize: Sequelize;
  }
}
