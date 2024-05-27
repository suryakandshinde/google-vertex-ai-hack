import { Body, Controller, HttpCode, HttpStatus, Post, UploadedFile, UseInterceptors } from "@nestjs/common";
import { Crud, CrudController } from "@dataui/crud";
import { Car } from "../entities/car";
import { CrudCarService } from "../services/crud-car.service";
import { ApiBody, ApiConsumes, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

import { FileInterceptor } from '@nestjs/platform-express';

@Crud({
    model: {
        type: Car,
    },   
})
@Controller("car")
@ApiTags('Car (Entity) CRUD APIs')
export class CrudCarController implements CrudController<Car> {
    constructor(public service: CrudCarService) {}

    // createOneBase( @ParsedRequest() req: CrudRequest, @ParsedBody() dto: Car): Promise<Car> {
    //     return this.service.createOne(req, dto);
    // }

    @HttpCode(HttpStatus.OK)
    @Post('/bulk/load-csv')
    @UseInterceptors(
        FileInterceptor('file', {})
    )    

    @ApiConsumes('multipart/form-data')
    @ApiBody({
      schema: {
        type: 'object',
        required: ['file'],
        properties: {
          maxrecord: { type: 'integer', default: -1,  description: 'Max nnumber of records to process (-1 process all records)',},            
          file: {
            type: 'string',
            format: 'binary',
          },
        },
      },
    })
    @ApiOperation({summary: 'Upload CSV file'})    
    @ApiResponse({ status: 200, description: 'Success'})
    async loadCsv(@UploadedFile() file: Express.Multer.File, @Body('maxrecord') maxrecord: number) {
      return this.service.loadCSV(file, maxrecord);
    }      
}

