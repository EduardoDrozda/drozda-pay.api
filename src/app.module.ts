import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';

import { AuthModule } from './domain/auth/auth.module';
import { CategoriesModule } from './domain/categories';
import { ConfigModule } from '@nestjs/config';
import { GetLoggedUserMiddleware } from './shared/middlewares';
import { UserModule } from './domain/user/user.module';
import configuration from './config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
    }),
    UserModule,
    AuthModule,
    CategoriesModule,
  ],
  controllers: [],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer
      .apply(GetLoggedUserMiddleware)
      .exclude(
        {
          path: 'api/login',
          method: RequestMethod.POST,
        },
        {
          path: 'api/login/me',
          method: RequestMethod.GET,
        },
        {
          path: 'api/users',
          method: RequestMethod.POST,
        },
      )
      .forRoutes('*');
  }
}
