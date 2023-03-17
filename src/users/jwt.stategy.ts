import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectModel } from '@nestjs/sequelize';
import { JwtPayload } from 'jsonwebtoken';
import { ExtractJwt, Strategy } from 'passport-jwt';

import configuration from '../config/app';
import { Users } from './users.model';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectModel(Users)
    private readonly usersModel: typeof Users,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configuration().jwt.secret,
    });
  }

  async validate(payload: JwtPayload) {
    const { email } = payload;
    const user = await this.usersModel.findOne({
      where: {
        email,
      },
    });

    if (!user) throw new UnauthorizedException();

    return user;
  }
}
