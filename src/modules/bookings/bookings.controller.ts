import { Body, Controller, Delete, Get, Param, Post, Req, UseGuards } from '@nestjs/common'
import { BookingsService } from './bookings.service'
import { AuthGuard } from '../../common/guards/auth.guard'
import { ICreateBookingDto } from '../../common/repos/booking/booking.types'
import { AuthRequest } from './bookings.types'

@Controller('bookings')
export class BookingsController {
    constructor(private readonly bookingsService: BookingsService) {}

    @UseGuards(AuthGuard)
    @Post()
    async createBooking(@Body(/* Validation Pipe */) dto: ICreateBookingDto) {
        return this.bookingsService.createBooking(dto)
    }

    @UseGuards(AuthGuard)
    @Get()
    async getBookings(@Req() req: AuthRequest) {
        return this.bookingsService.getBookings(req.user)
    }

    @UseGuards(AuthGuard)
    @Delete(':id')
    async deleteBooking(@Param('id') id: string, @Req() req: AuthRequest) {
        return this.bookingsService.deleteBooking(Number(id), req.user)
    }
}
