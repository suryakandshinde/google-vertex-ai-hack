import { ApiProperty } from "@dataui/crud/lib/crud";
import { IsArray, IsDate, IsNumber, IsString } from "class-validator";
import { Car } from "./entities/car";

export class CarFilter {
    @IsString()
    @ApiProperty({ example: 'Honda', description: 'Make or model of car', required: true })
    model: string;

    @ApiProperty({ example: true, description: 'AvailabilityStatus of car', required: false })
    @IsString()
    availabilityStatus: boolean;
    
    @IsString()
    @ApiProperty({ example: 'Toronto', description: 'City where the car is needed', required: true })
    city: string;
}

export class BookingFilter {
    @IsNumber()
    @ApiProperty({ example: 1, description: 'Booking id', required: true })
    bookingId: number;

    @IsString()
    @ApiProperty({ example: 'John Doe', description: 'Name of the customer booking the car', required: true })
    customerName: string;
    
    @IsString()
    @ApiProperty({ example: 'johndoe@doesnotexist.com', description: 'Email of the customer booking the car', required: true })
    customerEmail: string;
}

export class CarList {
    @IsArray()
    @ApiProperty({ example: [], description: 'List of cars', required: true })
    items: Array<Car>;
}

export class BookCarRequest {
    @IsNumber()
    @ApiProperty({ example: 1, description: 'Id of the car', required: true })
    carId: number;

    @IsDate()
    @ApiProperty({ example: '2024-22-04', description: 'Start date of renting (format: YYYY-MM-DD)', required: true })
    rentalStartDate: Date

    @IsDate()
    @ApiProperty({ example: '2024-24-04', description: 'End date of renting (format: YYYY-MM-DD)', required: true })
    rentalEndDate: Date;

    @IsString()
    @ApiProperty({ example: 'Toronto', description: 'City where the car will be dropped', required: true })
    rentalCityDrop: string;

    @IsString()
    @ApiProperty({ example: 'Surya', description: 'Name of customer who want to book car', required: true })
    customerName: string;

    @IsString()
    @ApiProperty({ example: 'someemail@example.com', description: 'Email of customer', required: true })
    customerEmail: string    
}


export class BookingDetailRequest {
    @IsNumber()
    @ApiProperty({ example: 1, description: 'Booking/Reservation ID', required: true })
    bookingId: number;  
}