
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TypeOrmCrudService } from "@dataui/crud-typeorm";
import { Car } from "../entities/car";

import { CsvParser } from 'nest-csv-parser';

import { createReadStream } from 'fs';
import { Readable } from "stream";
import { join } from "path";

@Injectable()
export class CrudCarService extends TypeOrmCrudService<Car> {

  constructor(@InjectRepository(Car) repo, private readonly csvParser: CsvParser) {
    super(repo);
    const loadCSV = process.env.LOAD_SAMPLE_DATA === 'true';
    const ci = this;

    if(loadCSV) {
      const csvFile = join(__dirname, '../../../sqlite/sample/cars.csv');      
      let stream  = createReadStream(csvFile);
      ci.loadFromStream(stream, 100);
    }
  }

  async loadCSV(file: Express.Multer.File, maxrecord?: number): Promise<Number> {
    const ci = this;
    if(file) {
      let stream  = Readable.from([file.buffer]);
      return await ci.loadFromStream(stream, maxrecord);
    }
    return 0;
  }

  async loadFromStream(stream: Readable, maxrecord?: number): Promise<Number> {
    const ci = this;
    if(stream) {
      let entities = null;
      const parserConfig = { strict: true, separator: ',', mapValues: ({ header, index, value }) => {
        if(header === 'availability') {
          return (value === 'true')
        }

        if(header === 'rentalPrice' || header === 'year') {
          return Number.parseFloat(value);
        }

        if(header === 'imageUrl') {
          return `${process.env.SERVER_URL}/assets/cars/${value}`;
        }

        return value;
      }}

      if(maxrecord > 0) {
        entities = await this.csvParser.parse(stream, Car, maxrecord, 0, parserConfig);
      } else {
        entities = await this.csvParser.parse(stream, Car, 1000, 0, parserConfig);
      }
      
      for (let index = 0; index < entities.list.length; index++) {
        const c:Car = entities.list[index];       
        let entity = await ci.repo.save(c);
        console.log(entity);        
      }
  
      return entities?.list?.length;
    }

    return 0;
  }
}