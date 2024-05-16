import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    if (req.headers['authorization']) {
      req['user'] = { id: 1, name: 'John Doe' };
    } else {
      req['user'] = null;
    }
    next();
  }
}