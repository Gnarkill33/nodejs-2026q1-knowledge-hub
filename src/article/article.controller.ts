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
  UseGuards,
  Req,
} from '@nestjs/common';
import { ArticleService } from './article.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { GetArticlesQueryDto } from './dto/get-articles-query.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { RoleGuard } from 'src/role/role.guard';
import { Roles } from 'src/role/role.decorator';
import { UserRole } from 'src/types';
import { Request } from 'express';

@Controller('article')
@UseGuards(AuthGuard, RoleGuard)
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Post()
  @Roles(UserRole.ADMIN, UserRole.EDITOR)
  create(@Body() dto: CreateArticleDto, @Req() req: Request) {
    return this.articleService.create(dto, req);
  }

  @Get()
  @Roles(UserRole.ADMIN, UserRole.EDITOR, UserRole.VIEWER)
  findAll(@Query() query?: GetArticlesQueryDto) {
    return this.articleService.findAll(query);
  }

  @Get('/:id')
  @Roles(UserRole.ADMIN, UserRole.EDITOR, UserRole.VIEWER)
  findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.articleService.findOne(id);
  }

  @Put('/:id')
  @Roles(UserRole.ADMIN, UserRole.EDITOR)
  update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() dto: CreateArticleDto,
    @Req() req: Request,
  ) {
    return this.articleService.update(id, dto, req);
  }

  @Delete('/:id')
  @Roles(UserRole.ADMIN) // editor не может удалять чужие статьи, а свои может?
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.articleService.remove(id);
  }
}
