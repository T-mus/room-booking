import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { Booking } from './booking.model'
import {
    IBookingRepository,
    ICreateBookingDto,
    IFindBookingsFilter,
    IFindConflictingFilter,
} from '../booking.types'
import { Op } from 'sequelize'

@Injectable()
export class PostgresImplementation implements IBookingRepository {
    constructor(@InjectModel(Booking) private readonly model: typeof Booking) {}

    async create(dto: ICreateBookingDto) {
        return this.model.create(dto)
    }

    async findById(id: number) {
        return this.model.findByPk(id, { include: ['room', 'user'] })
    }

    async findAll(filter: IFindBookingsFilter = {}) {
        return this.model.findAll({
            where: { ...filter },
            include: ['room', 'user'],
        })
    }

    async findConflicting(filter: IFindConflictingFilter) {
        return this.model.findAll({
            where: {
                roomId: filter.roomId,
                [Op.and]: [
                    { startTime: { [Op.lt]: filter.endTime } },
                    { endTime: { [Op.gt]: filter.startTime } },
                ],
            },
        })
    }

    async delete(id: number) {
        return this.model.destroy({ where: { id } })
    }
}
