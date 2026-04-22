import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import 'dotenv/config';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async signUp(dto: CreateUserDto) {
    const { password, login } = dto;

    const existingUser = await this.prisma.user.findFirst({
      where: { login },
    });

    if (existingUser) {
      throw new BadRequestException('Login already taken');
    }

    const hashedPassword = await bcrypt.hash(
      password,
      Number(process.env.CRYPT_SALT),
    );

    await this.prisma.user.create({
      data: {
        login,
        password: hashedPassword,
        role: 'VIEWER',
      },
    });

    return { message: 'Signed up succesfully!' };
  }
}
