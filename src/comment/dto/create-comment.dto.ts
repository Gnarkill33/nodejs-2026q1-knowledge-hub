import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateCommentDto {
  @IsNotEmpty({ message: 'Comment content is required' })
  @IsString()
  content: string;

  @IsNotEmpty({ message: 'Article ID is required' })
  // @IsUUID()
  articleId: string;

  @IsOptional()
  @IsUUID()
  authorId: string | null;
}
