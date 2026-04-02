import {
  IsArray,
  IsIn,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { ArticleStatus } from 'src/types';

export class CreateArticleDto {
  @IsNotEmpty({ message: 'Article title is required' })
  @IsString()
  title: string;

  @IsNotEmpty({ message: 'Article content is required' })
  @IsString()
  content: string;

  @IsOptional()
  @IsIn(
    [ArticleStatus.ARCHIVED, ArticleStatus.DRAFT, ArticleStatus.PUBLISHED],
    {
      message: 'Status must be draft, published, or archived',
    },
  )
  status?: ArticleStatus;

  @IsOptional()
  @IsUUID()
  authorId: string | null;

  @IsOptional()
  @IsUUID()
  categoryId: string | null;

  @IsOptional()
  @IsArray()
  @IsString({ each: true, message: 'Each tag must be a string' })
  tags: string[] = [];
}
