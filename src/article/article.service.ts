import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { GetArticlesQueryDto } from './dto/get-articles-query.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ArticleService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateArticleDto) {
    const newArticle = await this.prisma.article.create({
      data: {
        title: dto.title,
        content: dto.content,
        status: dto.status,
        authorId: dto.authorId,
        categoryId: dto.categoryId,
        tags: {
          connectOrCreate:
            dto.tags?.map((name) => ({
              where: { name },
              create: { name },
            })) || [],
        },
      },
      include: {
        tags: {
          select: {
            name: true,
          },
        },
      },
    });

    const newArticleLowerCase = {
      ...newArticle,
      status: newArticle.status.toLowerCase(),
      createdAt: newArticle.createdAt.getTime(),
      updatedAt: newArticle.updatedAt.getTime(),
    };

    return newArticleLowerCase;
  }

  async findAll(query: GetArticlesQueryDto) {
    const { status, categoryId, tag } = query;

    const filteredArticles = await this.prisma.article.findMany({
      where: {
        ...(status && { status }),
        ...(categoryId && { categoryId }),
        ...(tag && { tags: { some: { name: tag } } }),
      },
      include: {
        tags: {
          select: {
            name: true,
          },
        },
      },
    });

    const filteredArticlesWithNormalizedTags = filteredArticles.map(
      (article) => ({
        ...article,
        status: article.status?.toLowerCase(),
        createdAt: article.createdAt?.getTime(),
        updatedAt: article.updatedAt?.getTime(),
        tags: article.tags.map((tag) => tag.name),
      }),
    );

    return filteredArticlesWithNormalizedTags;
  }

  async findOne(id: string) {
    const existingArticle = await this.prisma.article.findUnique({
      where: { id },
      include: {
        tags: { select: { name: true } },
      },
    });

    if (!existingArticle) {
      throw new NotFoundException('Article not found');
    }

    const existingArticleLowerCase = {
      ...existingArticle,
      status: existingArticle.status.toLowerCase(),
      tags: existingArticle.tags?.map((tag) => tag.name) || [],
    };

    return existingArticleLowerCase;
  }

  async update(id: string, dto: CreateArticleDto) {
    const existingArticle = await this.findOne(id);

    if (!existingArticle) throw new NotFoundException('Article not found');

    const updatedArticle = await this.prisma.article.update({
      where: { id },
      data: {
        title: dto.title,
        content: dto.content,
        status: dto.status,
        authorId: dto.authorId,
        categoryId: dto.categoryId,
        tags: {
          connectOrCreate:
            dto.tags?.map((name) => ({
              where: { name },
              create: { name },
            })) || [],
        },
      },
      include: {
        tags: {
          select: {
            name: true,
          },
        },
      },
    });

    const updatedArticlesWithNormalizedTags = {
      ...updatedArticle,
      tags: updatedArticle.tags.map((tag) => tag.name),
    };

    return updatedArticlesWithNormalizedTags;
  }

  async remove(id: string) {
    const existingArticle = await this.findOne(id);

    if (!existingArticle) throw new NotFoundException('Article not found');

    await this.prisma.article.delete({ where: { id } });
  }
}
