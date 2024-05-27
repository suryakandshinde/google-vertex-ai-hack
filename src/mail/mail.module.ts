import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { Module } from '@nestjs/common';
import { join } from 'path';
import { MailService } from './mail-service';
import { MailController } from './mail.controller';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    MailerModule.forRootAsync({
        useFactory: async (config: ConfigService) => ({
            transport: {
                host: config.get('MAIL_HOST'),
                secure: false,
                auth: {
                    user: config.get('MAIL_USER'),
                    pass: config.get('MAIL_PASS'),
                },
            },
            defaults: {
                from: config.get('MAIL_FROM'),
            },
            template: {
                dir: join(__dirname, 'templates'),
                adapter: new HandlebarsAdapter(),
                options: {
                    strict: true,
                },
            },
            options: {
                partials: {
                    dir: join(__dirname, 'templates', 'partials'),
                    options: {
                    strict: true,
                    },
                },
            },            
        }),
        inject: [ConfigService],
    }),       
  ],
  providers: [MailService],
  exports: [MailService], 
  controllers: [MailController]
})
export class MailModule {

}
