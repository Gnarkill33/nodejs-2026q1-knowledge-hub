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
  UseGuards,
  Req,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { GetCommentsQueryDto } from './dto/get-comments-query.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { RoleGuard } from 'src/role/role.guard';
import { Roles } from 'src/role/role.decorator';
import { UserRole } from 'src/types';
import { Request } from 'express';

@Controller('comment')
@UseGuards(AuthGuard, RoleGuard)
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post()
  @Roles(UserRole.ADMIN)
  create(@Body() dto: CreateCommentDto, @Req() req: Request) {
    return this.commentService.create(dto, req);
  }

  @Get()
  @Roles(UserRole.ADMIN, UserRole.EDITOR, UserRole.VIEWER)
  findAll(@Query() query: GetCommentsQueryDto) {
    return this.commentService.findAll(query);
  }

  @Get('/:id')
  @Roles(UserRole.ADMIN, UserRole.EDITOR, UserRole.VIEWER)
  findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.commentService.findOne(id);
  }

  @Delete('/:id')
  @Roles(UserRole.ADMIN)
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', new ParseUUIDPipe()) id: string) {
    // editor не может удалять чужие комменты, а свои может?
    return this.commentService.remove(id);
  }
}
