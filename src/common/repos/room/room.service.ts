import { Inject, Injectable } from '@nestjs/common'
import { ROOM_REPO_IMPLEMENTATION } from './room.constants'
import { ICreateRoomDto, IFindAvailableRoomsFilter, IRoomRepository } from './room.types'

@Injectable()
export class RoomRepository implements IRoomRepository {
    constructor(
        @Inject(ROOM_REPO_IMPLEMENTATION)
        private readonly implementation: IRoomRepository,
    ) {}

    async create(dto: ICreateRoomDto) {
        return this.implementation.create(dto)
    }

    async findById(id: number) {
        return this.implementation.findById(id)
    }

    async findAllAvailable(filter: IFindAvailableRoomsFilter) {
        return this.implementation.findAllAvailable(filter)
    }
}
