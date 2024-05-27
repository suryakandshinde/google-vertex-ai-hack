import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { Car } from './entities/car';
import { CarService } from './services/car.service';
import { CrudCarController } from './controller/crud-car.controller';
import { CrudCarService } from './services/crud-car.service';

import { CsvModule } from 'nest-csv-parser'
import { CarBooking } from './entities/car-booking';
import { CrudCarBookingService } from './services/crud-car-booking.service';
import { CrudCarBookingController } from './controller/crud-car-booking.controller';
import { MailModule } from 'src/mail/mail.module';
import { CarRetalController } from './controller/car-booking-agent-controller';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'sqlite',
            database: 'sqlite/demo-db',
            synchronize: true,
            entities: [Car, CarBooking],
            logging: true,
        }),    
        TypeOrmModule.forFeature([Car, CarBooking]),
        CsvModule,
        MailModule
    ],
    controllers: [
        CarRetalController,
        // CrudCarController,
        // CrudCarBookingController
    ],
    providers: [
        CarService,
        CrudCarService,
        CrudCarBookingService
    ],
    exports: [
        CarService,
    ]
})
export class DemoDBModule {}