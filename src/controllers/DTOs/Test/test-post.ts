import { IsString } from 'class-validator';
import { Type } from 'class-transformer';

export interface ITestPostFormat {
  name: string;
  preferredName: string;
  posts: PostDto[];
}

export class TestPostDto {
  public id?: string;

  @IsString()
  public name!: string;

  @IsString()
  public preferredName!: string;

  @Type(() => PostDto)
  public posts!: PostDto[];
}

export class PostDto {
  public id?: string;

  @IsString()
  public name!: string;

  @IsString()
  public content!: string;
}
