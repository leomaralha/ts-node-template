import { NextFunction, Response, Request } from 'express';

const sequelizeConnectionController = async (
  req: Request,
  _: Response,
  next: NextFunction
): Promise<void> => {
  if (req.sequelize) {
      await req.sequelize.close()
      console.info("Sequelize Connection was closed.")
    }
  next();
};

export { sequelizeConnectionController };
