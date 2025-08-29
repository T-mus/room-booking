import { Body, Controller, Get, HttpCode, Post, UseGuards } from '@nestjs/common'
import { RoomService } from './room.service'
import { Roles } from '../../common/decorators/roles.decorator'
import { RolesGuard } from '../../common/guards/roles.guard'
import { ICreateRoomDto, IFindAvailableRoomsFilter } from 'src/common/repos/room/room.types'

@Controller('rooms')
export class RoomController {
    constructor(private readonly roomService: RoomService) {}

    @Roles('ADMIN')
    @UseGuards(RolesGuard)
    @Post()
    async createRoom(@Body(/* Validation Pipe */) dto: ICreateRoomDto) {
        return this.roomService.createRoom(dto)
    }

    @HttpCode(200)
    @Post('available')
    async getAvailableRooms(@Body(/* Validation Pipe */) dto: IFindAvailableRoomsFilter) {
        return this.roomService.getAvailableRooms(dto)
    }
}
