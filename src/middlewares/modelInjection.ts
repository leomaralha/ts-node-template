import { ConnectionController } from '@src/services/database/ConnectionController';
import { connGetter } from '@src/services/database/getConnectionStrategy';
import { NextFunction, Response, Request } from 'express';

const modelInjection = async (
  req: Request,
  _: Response,
  next: NextFunction
): Promise<void> => {
  const connectionController = new ConnectionController(connGetter);
  const companyName = req.query.companyName;

  if (typeof companyName !== 'string') {
    throw new Error('unexpected type of companyName');
  }
  
  const sequelize = await connectionController.initSequelize(companyName);
  req.models = sequelize.models;
  req.sequelize = sequelize;
  next();
};

export default modelInjection;
