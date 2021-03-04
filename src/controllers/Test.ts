import { Controller, Get, Middleware, Post } from '@overnightjs/core';
import { NextFunction, Request, Response } from 'express';
import modelInjection from '@src/middlewares/modelInjection';
import bodyValidationMiddleware from '@src/middlewares/bodyValidationMiddleware';
import { User, Post as UserPost } from '@src/database/models';
import { ITestPostFormat, TestPostDto } from './DTOs/Test/test-post';

@Controller('test')
export class Test {
  @Get('')
  @Middleware([modelInjection])
  public async getHelloWorld(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const transaction = await req.sequelize.transaction();
    try {
      const newUser = await User.create(
        { name: 'Léo', preferredName: 'Maralha' },
        { transaction }
      );
      res.status(200).json(newUser);

      await transaction.rollback();
      console.log('Transaction was commited.');
    } catch (error) {
      await transaction.rollback();
      next(error);
    }
  }

  @Post('create')
  @Middleware([
    modelInjection,
    bodyValidationMiddleware<TestPostDto, ITestPostFormat>(TestPostDto),
  ])
  public async createUser(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const transaction = await req.sequelize.transaction();
    const apiData: ITestPostFormat = req.body;
    try {
      const newUser = await User.create(
        {
          name: apiData.name,
          preferredName: apiData.preferredName,
        },
        { transaction }
      );

      const posts = await UserPost.bulkCreate(
        apiData.posts.map((el) => ({
          name: el.name,
          content: el.content,
          UserId: newUser.id,
        })),
        { transaction }
      );

      res.status(201).json({
        user: newUser,
        posts: posts,
      });

      await transaction.rollback();
    } catch (error) {
      await transaction.rollback();
      next(error);
    }
  }
}
