import { randomBytes } from 'node:crypto';

import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/sequelize';
import * as bcrypt from 'bcrypt';
import * as process from 'process';

import configuration from '../config/app';
import { UserDataDto } from './dto/user-data.dto';
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

  async createUser(userDataDto: UserDataDto) {
    const { email, password } = userDataDto;
    const hashPassword = await bcrypt.hash(
      password,
      parseInt(process.env.SALT),
    );
    const confirmationCode = randomBytes(30).toString('hex');

    const date = new Date(Date.now() + parseInt(process.env.JWT_LIFETIME));
    const expirationDate = date.toUTCString();

    try {
      await this.usersModel.create({
        confirmationCode: confirmationCode,
        email: email,
        expirationDate: expirationDate,
        password: hashPassword,
      });
    } catch (e) {
      console.error(e.message);
    }
  }

  async login(userDataDto: UserDataDto) {
    const { email, password } = userDataDto;
    const user = await this.usersModel.findOne({
      where: {
        email,
      },
    });
    if (user && (await bcrypt.compare(password, user.password))) {
      await this.usersModel.update(
        { lastLogin: Date.now() },
        {
          where: {
            email: email,
          },
        },
      );
      const accessToken = this.jwtService.sign(
        { id: user.id },
        configuration().jwt,
      );

      return { accessToken };
    } else
      throw new UnauthorizedException(
        'Invalid email or password, please try again',
      );
  }

  async activate(code) {
    const user = await this.usersModel.findOne({
      where: { confirmationCode: code },
    });

    //TODO: 400
    if (!user)
      throw new HttpException(
        `Invalid confirmation code`,
        HttpStatus.NOT_ACCEPTABLE,
      );
    const currentDate = new Date(Date.now());
    const expiradeDate = new Date(user.expirationDate);

    if (user.confirmationCode === code && expiradeDate > currentDate)
      await this.usersModel.update(
        { isActive: true },
        { where: { email: user.email } },
      );
    else
      throw new HttpException(
        'Invalid or expired activation code',
        HttpStatus.BAD_REQUEST,
      );
  }
}
