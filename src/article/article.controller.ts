import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Query,
  ParseUUIDPipe,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ArticleService } from './article.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { GetArticlesQueryDto } from './dto/get-articles-query.dto';

@Controller('article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Post()
  create(@Body() dto: CreateArticleDto) {
    return this.articleService.create(dto);
  }

  @Get()
  findAll(@Query() query?: GetArticlesQueryDto) {
    return this.articleService.findAll(query);
  }

  @Get('/:id')
  findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.articleService.findOne(id);
  }

  @Put('/:id')
  update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() dto: CreateArticleDto,
  ) {
    return this.articleService.update(id, dto);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.articleService.remove(id);
  }
}
