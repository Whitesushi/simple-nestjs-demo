import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { LoggingService } from './logging.service';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(private loggingService: LoggingService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();

    const { method, url, params, query, body, headers } = request;
    const ip = request.ip || request.connection.remoteAddress;
    const user = request['user'] || null;

    const logData: any = {
      method,
      url,
      params,
      query,
      body,
      headers,
      ip,
      userId: user ? user.id : null,
      response: null,
      error: null,
    };

    return next.handle().pipe(
      tap(() => {
        logData.response = {
          statusCode: response.statusCode,
          headers: response.getHeaders(),
        };
        this.loggingService.logRequest(logData);
      }),
      catchError((error) => {
        logData.error = {
          message: error.message,
          stack: error.stack,
        };
        this.loggingService.logRequest(logData);
        return throwError(error);
      }),
    );

  }
}
