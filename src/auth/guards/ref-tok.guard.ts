import { AuthGuard } from '@nestjs/passport';

export class RefTokGuard extends AuthGuard('jwt-refresh') {
  constructor() {
    super();
  }
}
