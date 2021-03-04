import { ConnectionController } from '@src/services/database/ConnectionController';
import { connGetter } from '@src/services/database/getConnectionStrategy';
import { NextFunction, Response, Request } from 'express';

const modelInjection = async (
  req: Request,
  _: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const host = req.hostname;
    const connectionController = new ConnectionController(connGetter);
    const sequelize = await connectionController.initSequelize(host);

    req.sequelize = sequelize;
    req.models = sequelize.models;

    next();
  } catch (error) {
    next(error);
  }
};

export default modelInjection;
