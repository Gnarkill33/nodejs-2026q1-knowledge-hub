import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { db, uuid } from 'db';

@Injectable()
export class CommentService {
  create(dto: CreateCommentDto) {
    const existingArticle = db.articles.find(
      (article) => article.id === dto.articleId,
    );

    if (!existingArticle)
      throw new UnprocessableEntityException(
        "Article with this ID doesn't exist",
      );

    const newComment = {
      id: uuid(),
      ...dto,
      createdAt: Date.now(),
    };

    db.comments.push(newComment);

    return newComment;
  }

  findAll(articleId: string) {
    return db.comments.filter((comment) => comment.articleId === articleId);
  }

  findOne(id: string) {
    const comment = db.comments.find((comment) => comment.id === id);

    if (!comment) {
      throw new NotFoundException('Comment not found');
    }

    return comment;
  }

  remove(id: string) {
    const existingComment = db.comments.find((comment) => comment.id === id);

    if (!existingComment) throw new NotFoundException('Comment not found');

    db.comments = db.comments.filter((comment) => comment.id !== id);
  }
}
