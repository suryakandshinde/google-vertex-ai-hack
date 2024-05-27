
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TypeOrmCrudService } from "@dataui/crud-typeorm";
import { Car } from "../entities/car";

import { BookingStatus, CarBooking } from "../entities/car-booking";
import { Repository } from "typeorm";
import { GeneralStatus } from "src/models";
import { DATE_FORMAT } from "src/prompts";
import { BookingFilter } from "../models";
const moment = require('moment');

@Injectable()
export class CrudCarBookingService extends TypeOrmCrudService<CarBooking> {
  carRepo: Repository<Car>;
  
  constructor(@InjectRepository(CarBooking) repo, @InjectRepository(Car) carRepo: Repository<Car>) {
    super(repo);
    this.carRepo = carRepo;
  }
  
  async bookCar(carId: number, rentalStartDate: any, rentalEndDate: any, rentalCityDrop: string, customerName: string, customerEmail: string) {
    const ci = this;
    
    try {
      let car: Car = await ci.carRepo.findOne({where : {id: carId}});

      if(car) {
        rentalStartDate = moment(rentalStartDate, DATE_FORMAT);
        rentalStartDate.year(moment().year());
    
        rentalEndDate = moment(rentalEndDate, DATE_FORMAT);
        rentalEndDate.year(moment().year());  

        // Save booking
        let booking:CarBooking = new CarBooking();
        booking.car = car;
        booking.rentalStartDate = rentalStartDate.toDate();
        booking.rentalEndDate = rentalEndDate.toDate();
        booking.rentalCityDrop = rentalCityDrop;
        booking.customerName = customerName;
        booking.customerEmail = customerEmail;
        
        let savedBooking = await ci.repo.save(booking);
        
        // Update car availability
        car.availability = false;
        await ci.carRepo.save(car);
        
        return savedBooking;  
      }
    } catch (error) {
      console.error(error);
      return null;
    }
    
  }
  
  async updateCarBookingDate(bookingId: number, rentalStartDate, rentalEndDate) {
    const ci = this;
    
    let booking = await ci.findOne({where: {id: bookingId}});

    if(booking) {
      rentalStartDate = moment(rentalStartDate, DATE_FORMAT);
      rentalStartDate.year(moment().year());
  
      rentalEndDate = moment(rentalEndDate, DATE_FORMAT);
      rentalEndDate.year(moment().year());  

      booking.rentalStartDate = rentalStartDate.toDate();
      booking.rentalEndDate = rentalEndDate.toDate();
      return await ci.repo.save(booking);
    }
    
    return null;
  }  
  
  async cancelBooking(bookingId: number): Promise<GeneralStatus> {
    const ci = this;
    
    let booking = await ci.findOne({where: {id: bookingId}});
    
    if(booking) {
      booking.status = BookingStatus.CANCELLED;
      await ci.repo.save(booking);

      return {
        status: true,
        message: 'Booking cancelled',
      };
    }
    
    return {
      status: false,
      message: 'Booking not found',
    };
  } 

  async getBookingDetail(bookingFilter: BookingFilter): Promise<CarBooking> {
    const ci = this;

    let whereConditon = [];

    if(bookingFilter.bookingId) {
      whereConditon.push({id: bookingFilter.bookingId});
    }

    if(bookingFilter.customerEmail) {
      whereConditon.push({customerEmail: bookingFilter.customerEmail});
    }

    if(bookingFilter.customerName) {
      whereConditon.push({customerName: bookingFilter.customerName});
    }

    let booking = await ci.findOne({where: whereConditon});
    
    if(booking) {
      return booking
    }
    
    return null;
  } 
  
}