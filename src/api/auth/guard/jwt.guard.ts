import { AuthGuard } from '@nestjs/passport';
import { ExecutionContext, HttpStatus } from '@nestjs/common';
import { JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken';
import { ApplicationErrorException } from '../../../exceptions/application-error.exception';

/**
 * JwtGuard
 */
export class JwtGuard extends AuthGuard('jwt') {
  /**
   * Determines whether the request is authorized.
   * @param {ExecutionContext} context - The execution context.
   * @return {boolean} - Whether the request is authorized.
   */
  async canActivate(context: ExecutionContext): Promise<any> {
    const request = context.switchToHttp().getRequest<Request>();
    const authorization = request.headers['authorization'];
    const isBearerToken = authorization?.search('Bearer ') === 0;
    if (!authorization || !isBearerToken) {
      throw new ApplicationErrorException('4007');
    }
    return await super.canActivate(context);
  }

  /**
   *
   * @param {any}err
   * @param {any}user
   * @param {any}info
   * @return {*}
   */
  handleRequest(err, user, info) {
    if (err || !user) {
      if (info instanceof TokenExpiredError) {
        throw new ApplicationErrorException(
          '4007',
          undefined,
          HttpStatus.UNAUTHORIZED
        );
      }
      if (info instanceof JsonWebTokenError) {
        throw new ApplicationErrorException(
          '4007',
          undefined,
          HttpStatus.UNAUTHORIZED
        );
      }
      throw err || info;
    }
    return user;
  }
}
