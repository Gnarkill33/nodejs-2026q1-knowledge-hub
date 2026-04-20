import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { UserRole } from 'src/types';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateUserDto) {
    const newUser = await this.prisma.user.create({
      data: {
        login: dto.login,
        password: dto.password,
        role: dto.role || UserRole.VIEWER,
      },
    });

    const newUserNoPassword = { ...newUser };
    delete newUserNoPassword.password;

    return newUserNoPassword;
  }

  async findAll() {
    return await this.prisma.user.findMany();
  }

  async findOne(id: string) {
    const existingUser = await this.prisma.user.findUnique({ where: { id } });

    if (!existingUser) throw new NotFoundException('User not found');

    const existingUserNoPassword = { ...existingUser };
    delete existingUser.password;

    return existingUserNoPassword;
  }

  async update(id: string, dto: UpdatePasswordDto) {
    const existingUser = await this.prisma.user.findUnique({ where: { id } });

    if (!existingUser) throw new NotFoundException('User not found');

    if (existingUser.password !== dto.oldPassword)
      throw new ForbiddenException('Wrong password');

    const updatedUser = await this.prisma.user.update({
      where: { id },
      data: { password: dto.newPassword },
    });

    const updatedUserNoPassword = { ...updatedUser };
    delete updatedUserNoPassword.password;

    return updatedUserNoPassword;
  }

  async remove(id: string) {
    const existingUser = await this.prisma.user.findUnique({ where: { id } });
    if (!existingUser) throw new NotFoundException('User not found');

    await this.prisma.user.delete({ where: { id } });
  }
}
