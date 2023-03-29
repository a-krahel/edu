import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { NextFunction, Request, Response } from 'express';

import { JwtStrategy } from './jwt.stategy';

@Injectable()
export class IsActiveMiddleware implements NestMiddleware {
  constructor(
    private jwtStrategy: JwtStrategy,
    private jwtService: JwtService,
  ) {}
  async use(req: Request, res: Response, next: NextFunction) {
    if (!req.headers['authorization'])
      throw new UnauthorizedException('Please login before request');
    const id = await this.jwtService.decode(
      req.headers['authorization'].slice(7),
    );
    const user = await this.jwtStrategy.validate(id);
    if (!user.isActive) {
      throw new UnauthorizedException('Please activate your account to access');
    }

    req.body = user.dataValues;

    next();
  }
}
