import { Module } from '@nestjs/common'
import { BookingRepository } from './booking.service'
import { BOOKING_REPO_IMPLEMENTATION } from './booking.constants'
import { SequelizeModule } from '@nestjs/sequelize'
import { PostgresImplementation } from './postgres/postgres.implementation'
import { Booking } from './postgres/booking.model'
import { Room } from '../room/postgres/room.model'
import { User } from '../user/postgres/user.model'

@Module({
    imports: [SequelizeModule.forFeature([Booking, Room, User])],
    providers: [
        BookingRepository,
        {
            provide: BOOKING_REPO_IMPLEMENTATION,
            useClass: PostgresImplementation,
        },
    ],
    exports: [BookingRepository],
})
export class BookingRepositoryModule {}
