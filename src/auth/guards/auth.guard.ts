import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class RefTokGuard extends AuthGuard('jwt') {
  constructor() {
    super();
  }
}
