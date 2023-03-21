import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/sequelize';
import * as bcrypt from 'bcrypt';
import * as process from 'process';

import configuration from '../config/app';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { Users } from './users.model';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(Users)
    private readonly usersModel: typeof Users,
    private jwtService: JwtService,
  ) {}

  async findAll() {
    return this.usersModel.findAll();
  }

  findOne(id: string): Promise<Users> {
    return this.usersModel.findOne({
      where: {
        id,
      },
    });
  }

  async createUser(createUserDto: CreateUserDto) {
    const { email, password } = createUserDto;
    const hashPassword = await bcrypt.hash(
      password,
      parseInt(process.env.SALT),
    );
    const confirmationCode = await bcrypt.hash(email, 1);

    const date = new Date(Date.now() + parseInt(process.env.JWT_LIFETIME));
    const expirationDate = date.toUTCString();

    return this.usersModel.create({
      confirmationCode: confirmationCode,
      email: email,
      expirationDate: expirationDate,
      password: hashPassword,
    });
  }

  async login(loginUserDto: LoginUserDto) {
    const { email, password } = loginUserDto;
    const user = await this.usersModel.findOne({
      where: {
        email,
      },
    });
    if (user && bcrypt.compare(password, user.password)) {
      await this.usersModel.update(
        { lastLogin: Date.now() },
        {
          where: {
            email: email,
          },
        },
      );

      const accessToken = this.jwtService.sign({ email }, configuration().jwt);

      return { accessToken };
    } else throw new UnauthorizedException();
  }
}
