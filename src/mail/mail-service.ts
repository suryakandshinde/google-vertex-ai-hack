import { Injectable } from '@nestjs/common';
import { ISendMailOptions, MailerService } from '@nestjs-modules/mailer';
import { MailRequest } from './models';
import { join } from 'path';
import * as fs from 'node:fs'
import { GeneralStatus } from 'src/models';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}
  
  async sendMail(req: MailRequest) {
    const ci = this;

    try {
      await ci.mailerService.sendMail({
        to: req.email,
        // from: process.env.MAIL_FROM, // sender address
        subject: req.subject,
        text: req.text, // plaintext body
        html: req.html, // html body
      });
      return {
        success: true,
      };
    } catch (error) {
      return {
        success: false,
      };
    }
  }
  
  async sendMailUsingTemplate(req: MailRequest, template: string, context: any): Promise<GeneralStatus> {
    const ci = this;
    
    let sendMailOptions: ISendMailOptions = {
      to: req.email,
      subject: req.subject,
      template: template,
      context: context,
    }

    if(context && context.imageUrl) {
      const imagePath = join(__dirname, '../..', process.env.PUBLIC_FOLDER, 'assets/cars',
      context.imageUrl.substring(context.imageUrl.lastIndexOf('/')+1),
      );
      const imageAttachment = fs.readFileSync(imagePath);

      sendMailOptions.attachments = [{
        filename: 'image.png',
        content: imageAttachment,
        encoding: 'base64',
        cid: 'carImage', // Referenced in the HTML template
      }]
    }

    try {
      await ci.mailerService.sendMail(sendMailOptions);
      return {
        status: true,
      };
    } catch (error) {
      return {
        status: false,
      };
    }
  }
  
}
