import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { db, uuid } from 'db';

@Injectable()
export class CategoryService {
  create(dto: CreateCategoryDto) {
    const newCategory = {
      id: uuid(),
      ...dto,
    };

    db.categories.push(newCategory);

    return newCategory;
  }

  findAll() {
    return db.categories;
  }

  findOne(id: string) {
    const category = db.categories.find((category) => category.id === id);

    if (!category) throw new NotFoundException('Category not found');

    return category;
  }

  update(id: string, dto: CreateCategoryDto) {
    const existingCategory = this.findOne(id);

    if (!existingCategory) throw new NotFoundException('Category not found');

    const updatedCategory = { ...existingCategory, ...dto };

    db.categories = db.categories.map((category) =>
      category.id !== id ? category : updatedCategory,
    );

    return updatedCategory;
  }

  remove(id: string) {
    const existingCategory = this.findOne(id);

    if (!existingCategory) throw new NotFoundException('Category not found');

    db.categories = db.categories.filter((category) => category.id !== id);

    db.articles = db.articles.map((article) =>
      article.categoryId === id ? { ...article, categoryId: null } : article,
    );
  }
}
