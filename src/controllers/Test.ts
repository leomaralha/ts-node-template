import { Controller, Get } from '@overnightjs/core';
import { Request, Response } from 'express';

@Controller('test')
export class Test {
  @Get('')
  public getHelloWorld(_: Request, res: Response): void {
    res.send('Hello World');
  }
}