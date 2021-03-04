import { plainToClass, ClassTransformOptions, ClassConstructor } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';
import { RequestHandler } from 'express';
import HttpException from '@src/exceptions/httpException';

function bodyValidationMiddleware<C, B>(
  ClassDTO: ClassConstructor<C>,
  options?: ClassTransformOptions
): RequestHandler {
  return async (req, res, next) => {
    const instances = plainToClass<C, B>(ClassDTO, req.body, options);
    const errors = await validate(instances);

    if (errors.length > 0) {
      const message = errors
        .map((error: ValidationError) => Object.values(error.constraints || {}))
        .join(', ');
      next(new HttpException(400, message));
    } else {
      next();
    }
  };
}

export default bodyValidationMiddleware;
