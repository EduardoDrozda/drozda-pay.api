import { INestApplication, Logger, ValidationPipe } from '@nestjs/common';

import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';

export default class Application {
  private app: INestApplication;
  private configService: ConfigService;
  private logger: Logger;

  async bootstrap(): Promise<void> {
    this.app = await NestFactory.create(AppModule);
    await this.setGlobalScopes();
    await this.startup();
  }

  private async setGlobalScopes() {
    this.app.setGlobalPrefix('/api');
    this.app.useGlobalPipes(new ValidationPipe());
  }

  private async startup() {
    this.configService = this.app.get(ConfigService);
    this.logger = new Logger(Application.name);

    const port = this.configService.get('port');

    await this.app.listen(port, async () => {
      this.logger.log(
        `Application is running on: http://localhost:${port}/api`,
      );
    });
  }
}
