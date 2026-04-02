import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { db, uuid } from 'db';
import { UserRole } from 'src/types';

@Injectable()
export class UserService {
  create(dto: CreateUserDto) {
    const newUser = {
      id: uuid(),
      login: dto.login,
      password: dto.password,
      role: dto.role || UserRole.VIEWER,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    const newUserNoPassword = { ...newUser };
    delete newUserNoPassword.password;

    db.users.push(newUser);

    return newUserNoPassword;
  }

  findAll() {
    return db.users;
  }

  findOne(id: string) {
    const user = db.users.find((user) => user.id === id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  update(id: string, dto: UpdatePasswordDto) {
    const existingUser = this.findOne(id);

    if (!existingUser) throw new NotFoundException('User not found');

    if (existingUser.password !== dto.oldPassword)
      throw new ForbiddenException('Wrong password');

    const updatedUser = {
      ...existingUser,
      password: dto.newPassword,
      updatedAt: Date.now(),
    };

    db.users = db.users.map((user) => (user.id === id ? updatedUser : user));

    const updatedUserNoPassword = { ...updatedUser };
    delete updatedUserNoPassword.password;

    return updatedUserNoPassword;
  }

  remove(id: string) {
    const existingUser = this.findOne(id);

    if (!existingUser) throw new NotFoundException('User not found');

    db.users = db.users.filter((user) => user.id !== id);

    db.articles = db.articles.map((article) =>
      article.authorId === id ? { ...article, authorId: null } : article,
    );

    db.comments = db.comments.filter((comment) => comment.authorId !== id);
  }
}
