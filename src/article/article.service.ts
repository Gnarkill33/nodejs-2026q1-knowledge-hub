import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { db, uuid } from 'db';
import { GetArticlesQueryDto } from './dto/get-articles-query.dto';
import { ArticleStatus } from 'src/types';

@Injectable()
export class ArticleService {
  create(dto: CreateArticleDto) {
    const newArticle = {
      id: uuid(),
      ...dto,
      status: dto.status || ArticleStatus.DRAFT,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    db.articles.push(newArticle);

    return newArticle;
  }

  findAll(query: GetArticlesQueryDto) {
    const { status, categoryId, tag } = query;

    let filteredArticles = [...db.articles];

    if (status) {
      filteredArticles = filteredArticles.filter(
        (article) => article.status === status,
      );
    }

    if (categoryId) {
      filteredArticles = filteredArticles.filter(
        (article) => article.categoryId === categoryId,
      );
    }

    if (tag) {
      filteredArticles = filteredArticles.filter((article) =>
        article.tags.includes(tag),
      );
    }

    return filteredArticles;
  }

  findOne(id: string) {
    const article = db.articles.find((article) => article.id === id);

    if (!article) {
      throw new NotFoundException('Article not found');
    }

    return article;
  }

  update(id: string, dto: CreateArticleDto) {
    const existingArticle = this.findOne(id);

    if (!existingArticle) throw new NotFoundException('Article not found');

    const updatedArticle = {
      ...existingArticle,
      ...dto,
      updatedAt: Date.now(),
    };

    db.articles.map((article) =>
      article.id !== id ? article : updatedArticle,
    );

    return updatedArticle;
  }

  remove(id: string) {
    const existingArticle = this.findOne(id);

    if (!existingArticle) throw new NotFoundException('Article not found');

    db.articles = db.articles.filter((article) => article.id !== id);

    db.comments = db.comments.filter((comment) => comment.articleId !== id);
  }
}
