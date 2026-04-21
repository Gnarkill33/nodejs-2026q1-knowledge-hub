import { Transform } from 'class-transformer';
import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { Status } from 'src/generated/prisma/client';

export class CreateArticleDto {
  @IsNotEmpty({ message: 'Article title is required' })
  @IsString()
  title: string;

  @IsNotEmpty({ message: 'Article content is required' })
  @IsString()
  content: string;

  @IsOptional()
  @Transform(({ value }) => value?.toUpperCase())
  @IsEnum(Status, {
    message: 'Status must be draft, published, or archived',
  })
  status?: Status = Status.DRAFT;

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
