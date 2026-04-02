import { IsOptional, IsString } from 'class-validator';
import { ArticleStatus } from 'src/types';

export class GetArticlesQueryDto {
  @IsOptional()
  @IsString()
  status?: ArticleStatus;

  @IsOptional()
  @IsString()
  categoryId?: string;

  @IsOptional()
  @IsString()
  tag: string;
}
