import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Users } from './users.model';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(Users)
    private readonly usersModel: typeof Users,
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
}
