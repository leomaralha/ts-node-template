import 'sequelize';
import { Model, ModelCtor, Sequelize } from 'sequelize/types';

interface Associable {
  associate(models: ModelCollection): void;
  Factory(sequelize: Sequelize): void;
}

export type AssociableModel = ModelCtor<Model> & Associable;

export interface ModelCollection {
  [keys: string]: AssociableModel;
}
