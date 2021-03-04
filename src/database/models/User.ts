import { ModelCollection } from '@src/@types/sequelize';
import {
  Sequelize,
  Model,
  DataTypes,
  Optional,
  Association,
} from 'sequelize';
import { Post } from './Post';

// These are all the attributes in the User model
interface UserAttributes {
  id: number;
  name: string;
  preferredName: string | null;
}
// Some attributes are optional in `User.build` and `User.create` calls
type UserCreationAttributes = Optional<UserAttributes, 'id'>;

class User
  extends Model<UserAttributes, UserCreationAttributes>
  implements UserAttributes {
  public id!: number; // Note that the `null assertion` `!` is required in strict mode.
  public name!: string;
  public preferredName!: string | null; // for nullable fields

  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  static Factory(sequelize: Sequelize): void {
    User.init(
      {
        id: {
          allowNull: false,
          primaryKey: true,
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        preferredName: {
          type: DataTypes.STRING,
          allowNull: false,
        },
      },
      {
        sequelize,
        freezeTableName: true,
      }
    );
  }

  public readonly Posts?: Post[];

  public static associations: {
    Posts: Association<User, Post>;
  };

  public static associate(models: ModelCollection): void {
    User.hasMany(models.Post);
  }
}

export { User };
