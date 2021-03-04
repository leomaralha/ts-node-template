import { ModelCollection } from '@src/@types/sequelize';
import { Sequelize, Model, DataTypes, Optional } from 'sequelize';

// These are all the attributes in the User model
interface PostAttributes {
  id: number;
  name: string;
  content: string | null;
}

// Some attributes are optional in `User.build` and `User.create` calls
type UserCreationAttributes = Optional<PostAttributes, 'id'>;

class Post
  extends Model<PostAttributes, UserCreationAttributes>
  implements PostAttributes {
  public id!: number; // Note that the `null assertion` `!` is required in strict mode.
  public name!: string;
  public content!: string | null; // for nullable fields

  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  static Factory(sequelize: Sequelize): void {
    Post.init(
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
        content: {
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

  public static associate(models: ModelCollection): void {
    Post.belongsTo(models.User);
  }
}

export { Post };
