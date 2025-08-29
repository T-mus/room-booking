import { Injectable } from '@nestjs/common'
import { RoomRepository } from 'src/common/repos/room/room.service'
import { ICreateRoomDto, IFindAvailableRoomsFilter } from 'src/common/repos/room/room.types'

@Injectable()
export class RoomService {
    constructor(private readonly roomRepo: RoomRepository) {}

    async createRoom(dto: ICreateRoomDto) {
        try {
            return await this.roomRepo.create(dto)
        } catch (error) {
            console.error('[Error in RoomService => createRoom]:\n', error)
            throw error
        }
    }

    async getAvailableRooms(dto: IFindAvailableRoomsFilter) {
        try {
            return await this.roomRepo.findAllAvailable(dto)
        } catch (error) {
            console.error('[Error in RoomService => getAvailableRooms]:\n', error)
            throw error
        }
    }
}
