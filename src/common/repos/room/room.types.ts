import { Room } from './postgres/room.model'

export interface ICreateRoomDto {
    name: string
    capacity: number
}

export interface IFindAvailableRoomsFilter {
    startTime: Date
    endTime: Date
}

export interface IRoomRepository {
    create(dto: ICreateRoomDto): Promise<Room>
    findById(id: number): Promise<Room | null>
    findAllAvailable(filter: IFindAvailableRoomsFilter): Promise<Room[]>
}
