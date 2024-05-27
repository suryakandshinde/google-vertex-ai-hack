import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { MailService } from './mail-service';
import { MailRequest } from './models';

@Controller()
@ApiTags('Mail')
export class MailController {
  constructor( private mailService: MailService) {}

  @HttpCode(HttpStatus.OK)
  @Post('/mail/inline-body')
  @ApiOperation({summary: 'Send mail with the provided body'})
  async mailInlineBody(@Body() req: MailRequest) {
    return this.mailService.sendMail(req);
  } 

  @HttpCode(HttpStatus.OK)
  @Post('/mail/template')
  @ApiOperation({summary: 'Send mail using template'})
  async mail(@Body() req: MailRequest) {
    return this.mailService.sendMailUsingTemplate(req, './confirmation.hbs', { 
      id: 'ABC1234',
      customerName: 'John Doe',
      make: 'Honda',
      model: 'Civic',
      year: '2015',
      city: 'Pick City',
      imageUrl: 'car_1.png',
      rentalCityDrop: 'Drop City',
      rentalPrice: 100.99
    });
  } 

}
