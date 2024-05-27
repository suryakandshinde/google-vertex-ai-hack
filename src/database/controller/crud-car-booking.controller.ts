import { Controller } from "@nestjs/common";
import { Crud, CrudController } from "@dataui/crud";
import { Car } from "../entities/car";
import { ApiTags } from "@nestjs/swagger";

import { CrudCarBookingService } from "../services/crud-car-booking.service";
import { CarBooking } from "../entities/car-booking";

@Crud({
    model: {
        type: Car,
    }, 
})
@Controller("car-booking")
@ApiTags('CarBooking (Entity) CRUD APIs')
export class CrudCarBookingController implements CrudController<CarBooking> {
    constructor(public service: CrudCarBookingService) {}    
}

