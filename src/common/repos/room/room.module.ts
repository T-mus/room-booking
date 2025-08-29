import { Module } from '@nestjs/common'
import { RoomRepository } from './room.service'
import { ROOM_REPO_IMPLEMENTATION } from './room.constants'
import { SequelizeModule } from '@nestjs/sequelize'
import { PostgresImplementation } from './postgres/postgres.implementation'
import { Room } from './postgres/room.model'
import { Booking } from '../booking/postgres/booking.model'

@Module({
    imports: [SequelizeModule.forFeature([Room, Booking])],
    providers: [
        RoomRepository,
        {
            provide: ROOM_REPO_IMPLEMENTATION,
            useClass: PostgresImplementation,
        },
    ],
    exports: [RoomRepository],
})
export class RoomRepositoryModule {}
