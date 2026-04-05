import { IsNotEmpty, IsUUID } from 'class-validator';

export class GetCommentsQueryDto {
  @IsNotEmpty({ message: 'articleId is required' })
  @IsUUID()
  articleId: string;
}
