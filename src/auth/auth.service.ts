import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import 'dotenv/config';
import { JwtService } from '@nestjs/jwt';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { JwtPayload } from 'src/types';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
  ) {}

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

  async login(dto: CreateUserDto) {
    const { password, login } = dto;

    const existingUser = await this.prisma.user.findFirst({
      where: { login },
    });

    if (!existingUser) {
      throw new ForbiddenException('User not found');
    }

    const isPasswordMatch = await bcrypt.compare(
      password,
      existingUser.password,
    );

    if (!isPasswordMatch) {
      throw new ForbiddenException('Invalid password');
    }

    const accessToken = await this.getAccessToken(existingUser);
    const refreshToken = await this.getRefreshToken(existingUser);

    return { accessToken, refreshToken };
  }

  async getAccessToken(userPayload: {
    id: string;
    login: string;
    role: string;
  }) {
    const payload: JwtPayload = {
      userId: userPayload.id,
      login: userPayload.login,
      role: userPayload.role,
    };

    const accessToken = await this.jwt.signAsync(payload);

    return accessToken;
  }

  async getRefreshToken(userPayload: { id: string }) {
    const refreshToken = await this.jwt.signAsync(
      { userId: userPayload.id },
      {
        secret: process.env.JWT_SECRET_REFRESH_KEY,
        expiresIn: process.env.TOKEN_REFRESH_EXPIRE_TIME,
      },
    );

    return refreshToken;
  }

  async refresh(dto: RefreshTokenDto) {
    const { refreshToken } = dto;

    if (!refreshToken) {
      throw new UnauthorizedException('No refresh token');
    }

    try {
      const decoded = await this.jwt.verifyAsync(refreshToken, {
        secret: process.env.JWT_SECRET_REFRESH_KEY,
      });

      const existingUser = await this.prisma.user.findUnique({
        where: { id: decoded.userId },
      });

      if (!existingUser) {
        throw new ForbiddenException('User not found');
      }

      const newAccessToken = await this.getAccessToken(existingUser);
      const newRefreshToken = await this.getRefreshToken(decoded.userId);

      return { accessToken: newAccessToken, refreshToken: newRefreshToken };
    } catch {
      throw new ForbiddenException('Refresh token is invalid or expired');
    }
  }
}
