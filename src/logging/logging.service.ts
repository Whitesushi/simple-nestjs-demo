import { Injectable } from '@nestjs/common';

@Injectable()
export class LoggingService {
  logRequest(request: any) {
    console.log('Request:', request);
  }
}
