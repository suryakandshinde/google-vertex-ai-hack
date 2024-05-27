import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

import { AppController } from './app.controller';
import { GoogleAIService } from './google-ai.service';
import { DemoDBModule } from './database/demodb.module';
import { MailService } from './mail/mail-service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', process.env.PUBLIC_FOLDER),
    }),
    DemoDBModule,
  ],
  controllers: [
    AppController
  ],
  providers: [
    // AppService,
    GoogleAIService,
    MailService
  ],
})
export class AppModule {}
