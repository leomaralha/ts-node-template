import { User } from './User';
import { Post } from './Post';
import { AssociableModel } from '@src/@types/sequelize';

function toArray(): AssociableModel[] {
  const collection = [User, Post];
  return collection as AssociableModel[];
}

export { User, Post, toArray };
