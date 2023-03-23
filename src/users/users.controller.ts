import {
  Body,
  Controller,
  Get,
  Headers,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { UserDataDto } from './dto/user-data.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get('')
  @UseGuards(AuthGuard())
  getUsers() {
    return this.userService.findAll();
  }

  @Get('/:id')
  @UseGuards(AuthGuard())
  getUser(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Post('')
  createUser(@Body() createUserDto: UserDataDto) {
    return this.userService.createUser(createUserDto);
  }

  @Post('/login')
  login(@Body() loginUserDto: UserDataDto) {
    return this.userService.login(loginUserDto);
  }

  @Post('/activate/:code')
  activate(@Param('code') code, @Headers('authorization') authorization) {
    return this.userService.activate(code, authorization);
  }
}
