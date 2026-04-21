import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateCategoryDto) {
    const newCategory = await this.prisma.category.create({
      data: { name: dto.name, description: dto.description },
    });

    return newCategory;
  }

  async findAll() {
    return await this.prisma.category.findMany();
  }

  async findOne(id: string) {
    const existingCategory = await this.prisma.category.findUnique({
      where: { id },
    });

    if (!existingCategory) throw new NotFoundException('Category not found');

    return existingCategory;
  }

  async update(id: string, dto: CreateCategoryDto) {
    const existingCategory = await this.prisma.category.findUnique({
      where: { id },
    });

    if (!existingCategory) throw new NotFoundException('Category not found');

    const updatedCategory = await this.prisma.category.update({
      where: { id },
      data: {
        name: dto.name,
        description: dto.description,
      },
    });

    return updatedCategory;
  }

  async remove(id: string) {
    const existingCategory = await this.prisma.category.findUnique({
      where: { id },
    });

    if (!existingCategory) throw new NotFoundException('Category not found');

    await this.prisma.category.delete({ where: { id } });
  }
}
