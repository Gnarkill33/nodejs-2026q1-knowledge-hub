import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  ParseUUIDPipe,
  HttpCode,
  HttpStatus,
  UseGuards,
  Req,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { RoleGuard } from 'src/role/role.guard';
import { Roles } from 'src/role/role.decorator';
import { UserRole } from 'src/types';
import { Request } from 'express';

@Controller('user')
@UseGuards(AuthGuard, RoleGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @Roles(UserRole.ADMIN)
  create(@Body() dto: CreateUserDto) {
    return this.userService.create(dto);
  }

  @Get()
  @Roles(UserRole.ADMIN, UserRole.EDITOR, UserRole.VIEWER)
  findAll() {
    return this.userService.findAll();
  }

  @Get('/:id')
  @Roles(UserRole.ADMIN, UserRole.EDITOR, UserRole.VIEWER)
  findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.userService.findOne(id);
  }

  @Put('/:id')
  @Roles(UserRole.ADMIN, UserRole.EDITOR)
  update(
    @Param('id', new ParseUUIDPipe())
    id: string,
    @Body() dto: UpdatePasswordDto,
    @Req() req: Request,
  ) {
    return this.userService.update(id, dto, req);
  }

  @Delete('/:id')
  @Roles(UserRole.ADMIN)
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.userService.remove(id);
  }
}
