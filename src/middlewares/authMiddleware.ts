import { NextFunction, Response, Request } from 'express';

const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {


  req.context = {
    user: {
      id: 1,
      name: 'léo',
    },
  };

  
  next();
};

export default authMiddleware;
