import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { PrismaService } from 'src/prisma.service';
import { GetCommentsQueryDto } from './dto/get-comments-query.dto';

@Injectable()
export class CommentService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateCommentDto) {
    const existingArticle = await this.prisma.article.findUnique({
      where: { id: dto.articleId },
    });

    if (!existingArticle)
      throw new UnprocessableEntityException(
        "Article with this ID doesn't exist",
      );

    const newComment = await this.prisma.comment.create({
      data: { articleId: dto.articleId, content: dto.content },
    });

    return { ...newComment, createdAt: newComment.createdAt?.getTime() };
  }

  async findAll(query: GetCommentsQueryDto) {
    const { articleId } = query;

    return await this.prisma.comment.findMany({ where: { articleId } });
  }

  async findOne(id: string) {
    const existingComment = await this.prisma.comment.findUnique({
      where: { id },
    });

    if (!existingComment) {
      throw new NotFoundException('Comment not found');
    }

    return existingComment;
  }

  async remove(id: string) {
    const existingComment = await this.prisma.comment.findUnique({
      where: { id },
    });

    if (!existingComment) throw new NotFoundException('Comment not found');

    await this.prisma.comment.delete({ where: { id } });
  }
}
