import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PassportStrategy } from '@nestjs/passport';
import { InjectModel } from '@nestjs/sequelize';
import { ExtractJwt, Strategy } from 'passport-jwt';

import configuration from '../config/app';
import { Users } from './users.model';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectModel(Users)
    private readonly usersModel: typeof Users,
    private jwtService: JwtService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configuration().jwt.secret,
    });
  }

  async validate(authorization) {
    const payload = this.jwtService.decode(authorization.slice(7));
    const email = payload['email'];

    const user = await this.usersModel.findOne({
      where: {
        email,
      },
    });

    if (!user) throw new UnauthorizedException();

    return user;
  }
}
