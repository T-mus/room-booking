import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { Room } from './room.model'
import { ICreateRoomDto, IFindAvailableRoomsFilter, IRoomRepository } from '../room.types'
import { Op } from 'sequelize'

@Injectable()
export class PostgresImplementation implements IRoomRepository {
    constructor(@InjectModel(Room) private readonly model: typeof Room) {}

    async create(dto: ICreateRoomDto) {
        return this.model.create(dto)
    }

    async findById(id: number) {
        return this.model.findByPk(id)
    }

    async findAllAvailable(filter: IFindAvailableRoomsFilter) {
        const { startTime, endTime } = filter

        return this.model.findAll({
            include: [
                {
                    association: this.model.associations.bookings,
                    required: false,
                    where: {
                        [Op.or]: [
                            {
                                startTime: { [Op.between]: [startTime, endTime] },
                            },
                            {
                                endTime: { [Op.between]: [startTime, endTime] },
                            },
                            {
                                startTime: { [Op.lte]: startTime },
                                endTime: { [Op.gte]: endTime },
                            },
                        ],
                    },
                },
            ],
            where: { '$bookings.id$': null },
        })
    }
}
