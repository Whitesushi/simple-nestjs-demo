import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggingService } from './logging/logging.service';
import { LoggingInterceptor } from './logging/logging.interceptor';
import { UserController } from './user/user.controller';
import { AuthMiddleware } from './auth/auth.middleware';

@Module({
  imports: [],
  controllers: [AppController, UserController],
  providers: [
    AppService,
    LoggingService,
    {
      provide: 'APP_INTERCEPTOR',
      useClass: LoggingInterceptor,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('*');
  }
}
