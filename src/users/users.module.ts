import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { SequelizeModule } from '@nestjs/sequelize';

import configuration from '../config/app';
import { JwtStrategy } from './jwt.stategy';
import { User, UserSchema } from './user.chema';
import { UsersController } from './users.controller';
import { Users } from './users.model';
import { UsersService } from './users.service';

@Module({
  controllers: [UsersController],
  exports: [JwtStrategy, PassportModule, UsersService],
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register(configuration().jwt),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    // SequelizeModule.forFeature([Users]),
  ],
  providers: [UsersService, JwtStrategy],
})
export class UsersModule {}
