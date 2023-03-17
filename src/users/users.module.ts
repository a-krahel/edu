import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { SequelizeModule } from '@nestjs/sequelize';

import configuration from '../config/app';
import { JwtStrategy } from './jwt.stategy';
import { UsersController } from './users.controller';
import { Users } from './users.model';
import { UsersService } from './users.service';

@Module({
  controllers: [UsersController],
  exports: [JwtStrategy, PassportModule],
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register(configuration().jwt),
    SequelizeModule.forFeature([Users]),
  ],
  providers: [UsersService, JwtStrategy],
})
export class UsersModule {}
