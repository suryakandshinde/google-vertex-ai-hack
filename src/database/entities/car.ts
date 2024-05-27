import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsDate, IsNumber, IsString } from 'class-validator';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { Exclude } from 'class-transformer';

@Entity('car') 
export class Car {
  
  @PrimaryGeneratedColumn()
  id?: number;

  @IsString()
  @ApiProperty({ example: 'Honda', description: 'Make of car', required: true })
  @Column({ name: 'make', length: 70, nullable: false })
  make: string;

  @IsString()
  @ApiProperty({ example: 'Civic', description: 'Model of car', required: true })  
  @Column({ name: 'model', length: 70, nullable: false })
  model: string;

  @IsNumber()
  @ApiProperty({ example: 1983, description: 'Year of car', required: true })
  @Column({ name: 'year', type: 'int', nullable: false })
  year: number;

  @IsString()
  @ApiProperty({ example: 'Red', description: 'Color of car', required: true })
  @Column({ name: 'color', length: 70, nullable: false })
  color: string;

  @IsString()
  @ApiProperty({ example: 'BX1234', description: 'Car plate number', required: true })
  @Column({ name: 'license_plate', length: 70, nullable: false })
  licensePlate: string;

  @IsString()
  @ApiProperty({ example: 'Toronto', description: 'City where the car is present', required: true })
  @Column({ name: 'city', length: 70, nullable: false })
  city: string;

  @IsNumber()
  @ApiProperty({ example: 99.99, description: 'Per day price of car', required: true })
  @Column({ name: 'rental_price', type: 'float', nullable: false })
  rentalPrice: number;

  @IsString()
  @ApiProperty({ example: '43.653225', description: 'Latitude', required: false })
  @Column({ name: 'lat', length: 70, nullable: true })
  lat?: string;
  
  @IsString()
  @ApiProperty({ example: '-79.383186', description: 'Longitude', required: false })
  @Column({ name: 'lon', length: 70, nullable: true })
  lon?: string;
  
  @IsBoolean()
  @ApiProperty({ example: 0, description: 'Car is available?', required: false })
  @Column({ name: 'availability', default: true, nullable: true })
  availability?: boolean;

  @IsString()
  @ApiProperty({ example: 'The car is in great condition.', description: 'description of car', required: false })
  @Column({ name: 'description', length: 200, nullable: true })
  description?: string;

  @IsString()
  @ApiProperty({ example: '/assets/cars/honda_civic_2015.png', description: 'Image url of car', required: false })
  @Column({ name: 'imageUrl', nullable: true })
  imageUrl?: string;

  @IsNumber()
  @ApiProperty({ example: 4.5, description: 'Rating of car', required: false })
  @Column({name: 'rating', type: 'float', nullable: true})
  rating?: number;

  @Exclude()
  toString = () : string => {
    return `
      id: ${this.id}, make: (${this.make}),  model: (${this.model}), 
      price: (${this.rentalPrice}), year: (${this.year}), description: (${this.description}), 
      imageUrl: (${this.imageUrl}), rating: (${this.rating})
    `;
  }  
}