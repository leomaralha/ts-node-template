import { User } from '@src/database/models/User';
import { NextFunction, Response, Request } from 'express';

const authMiddleware = (
  req: Request,
  _: Response,
  next: NextFunction
): void => {
  req.context = {
    user: new User({ name: 'leo', preferredName: 'maralha', id: 1 }),
  };

  next();
};

export default authMiddleware;
