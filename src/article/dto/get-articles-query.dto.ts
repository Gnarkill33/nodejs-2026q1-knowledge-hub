import { IsEnum, IsOptional, IsString } from 'class-validator';
import { Status } from 'src/generated/prisma/client';
import { Transform } from 'class-transformer';

export class GetArticlesQueryDto {
  @IsOptional()
  @Transform(({ value }) => value?.toUpperCase())
  @IsEnum(Status)
  status?: Status;

  @IsOptional()
  @IsString()
  categoryId?: string;

  @IsOptional()
  @IsString()
  tag: string;
}
