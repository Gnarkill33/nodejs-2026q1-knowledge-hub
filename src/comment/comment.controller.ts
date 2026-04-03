import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
  HttpStatus,
  HttpCode,
  ParseUUIDPipe,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { GetCommentsQueryDto } from './dto/get-comments-query.dto';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post()
  create(@Body() dto: CreateCommentDto) {
    return this.commentService.create(dto);
  }

  @Get()
  findAll(@Query() query: GetCommentsQueryDto) {
    return this.commentService.findAll(query.articleId);
  }

  @Get('/:id')
  findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.commentService.findOne(id);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.commentService.remove(id);
  }
}
