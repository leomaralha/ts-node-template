import HttpException from '@src/exceptions/httpException';
import { Request, Response } from 'express';

function handleRequestError(
  error: HttpException,
  _: Request,
  response: Response,
): void {
  const status = error.status || 500;
  const message = error.message || 'Something went wrong';
  response.status(status).send({
    status,
    message,
  });
}

export { handleRequestError };
