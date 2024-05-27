import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { BookCarRequest, BookingDetailRequest, CarFilter, CarList } from "../models";
import { CarService } from "../services/car.service";
import { CarBooking } from "../entities/car-booking";
import { GeneralStatus } from "src/models";


@Controller("car-rental")
@ApiTags('Car Rental')
export class CarRetalController {
    
    constructor(private carService: CarService) {}

    @HttpCode(HttpStatus.OK)
    @Post('/list-cars')
    @ApiOperation({summary: 'Search cars within a given city based on make and model of car'})
    @ApiResponse({ status: 200, description: 'Success', type:  CarList})
    async listCars(@Body() req: CarFilter): Promise<CarList> {
        const ci = this;
        const cars = await ci.carService.findAll(req.model, req.availabilityStatus, req.city);
        let carList: CarList = new CarList();
        carList.items = cars;
        return carList;
    }
    
    @HttpCode(HttpStatus.OK)
    @Post('/book-car')
    @ApiOperation({summary: 'Book a rental car based on the provided details'})
    @ApiResponse({ status: 200, description: 'Success', type:  CarBooking})
    async bookCar(@Body() req: BookCarRequest): Promise<CarBooking> {
        const ci = this;
        const booking: CarBooking = await ci.carService.bookCar(req.carId, req.rentalStartDate, req.rentalEndDate, req.rentalCityDrop, req.customerName, req.customerEmail);
        return booking;
    }

    @HttpCode(HttpStatus.OK)
    @Post('/booking-detail')
    @ApiOperation({summary: 'Get rental car booking/reservation detail'})
    @ApiResponse({ status: 200, description: 'Success', type:  CarBooking})
    async bookingDetail(@Body() req: BookingDetailRequest): Promise<CarBooking> {
        const ci = this;
        const booking: CarBooking = await ci.carService.getBookingDetail(req.bookingId);
        return booking;
    }

    @HttpCode(HttpStatus.OK)
    @Post('/cancel-booking')
    @ApiOperation({summary: 'Cancel rental car booking/reservation'})
    @ApiResponse({ status: 200, description: 'Success', type:  GeneralStatus})
    async cancelBooking(@Body() req: BookingDetailRequest): Promise<GeneralStatus> {
        const ci = this;
        const status = await ci.carService.cancelBooking(req.bookingId);
        return status;
    }

    @HttpCode(HttpStatus.OK)
    @Post('/confirmation-email')
    @ApiOperation({summary: 'Send rental car booking/reservation details via email'})
    @ApiResponse({ status: 200, description: 'Success', type:  GeneralStatus})
    async sendBookingDetailViaEmail(@Body() req: BookingDetailRequest): Promise<GeneralStatus> {
        const ci = this;
        return await ci.carService.sendMail(req.bookingId, 'Your booking is confirmed', './confirmation.hbs')
    }
}