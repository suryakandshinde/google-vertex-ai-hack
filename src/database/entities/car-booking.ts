import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsString } from 'class-validator';
import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { Exclude } from 'class-transformer';
import { Car } from './car';

export class BookingStatus {
  static CONFIRMED = "confirmed";
  static CANCELLED = "cancelled";
}

@Entity('car_booking') 
export class CarBooking {
  
  @PrimaryGeneratedColumn()
  id?: number;

  @ApiProperty({ example: 'Honda', description: 'Car ID', required: true })
  @OneToOne(() => Car, {eager: true})
  @JoinColumn()
  car: Car

  @IsString()
  @ApiProperty({ example: 'John Doe', description: 'Name of the customer booking the car', required: true })
  @Column({ name: 'rental_customer_name', length: 70, nullable: false })
  customerName: string;
  
  @IsString()
  @ApiProperty({ example: 'johndoe@doesnotexist.com', description: 'Email of the customer booking the car', required: true })
  @Column({ name: 'rental_customer_email', length: 70, nullable: false })
  customerEmail: string;

  @IsString()
  @ApiProperty({ example: 'Mississauga', description: 'City where the car is will be dropped', required: true })
  @Column({ name: 'rental_city_drop', length: 70, nullable: false })
  rentalCityDrop: string;

  @IsDate()
  @ApiProperty({ example: Date.now(), description: 'Rental start date', required: true })
  @Column({ name: 'rental_start_date', type: "datetime", nullable: false })
  rentalStartDate?: Date;

  @IsDate()
  @ApiProperty({ example: Date.now(), description: 'Rental end date', required: true })
  @Column({ name: 'rental_end_date', type: "datetime", nullable: false })
  rentalEndDate?: Date;

  @IsDate()
  @ApiProperty({ example: Date.now(), description: 'Rental end date', required: true })
  @Column({ name: 'rental_book_date', type: "datetime", nullable: false, default: Date.now() })
  rentalBookDate?: Date;

  @IsString()
  @ApiProperty({ example: 'John Doe', description: 'Name of the customer booking the car', required: true })
  @Column({ name: 'rental_status', default: BookingStatus.CONFIRMED, nullable: false })
  status: string;

  @Exclude()
  toString = () : string => {
    return `id: ${this.id}, make: (${this.car.toString()}),  model: (${this.rentalStartDate}), description: (${this.rentalEndDate}), imageUrl: (${this.rentalBookDate})`;
  }


}

