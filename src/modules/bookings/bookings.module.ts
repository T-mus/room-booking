import { Module } from '@nestjs/common'
import { BookingsController } from './bookings.controller'
import { BookingsService } from './bookings.service'
import { BookingRepositoryModule } from '../../common/repos/booking/booking.module'
import { RoomRepositoryModule } from '../../common/repos/room/room.module'

@Module({
    imports: [BookingRepositoryModule, RoomRepositoryModule],
    controllers: [BookingsController],
    providers: [BookingsService],
})
export class BookingsModule {}
