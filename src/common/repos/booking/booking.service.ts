import { Injectable, Inject } from '@nestjs/common'
import { BOOKING_REPO_IMPLEMENTATION } from './booking.constants'
import {
    IBookingRepository,
    ICreateBookingDto,
    IFindBookingsFilter,
    IFindConflictingFilter,
} from './booking.types'

@Injectable()
export class BookingRepository implements IBookingRepository {
    constructor(
        @Inject(BOOKING_REPO_IMPLEMENTATION)
        private readonly implementation: IBookingRepository,
    ) {}

    async create(dto: ICreateBookingDto) {
        return this.implementation.create(dto)
    }

    async findById(id: number) {
        return this.implementation.findById(id)
    }

    // TODO: Pagination
    async findAll(filter?: IFindBookingsFilter) {
        return this.implementation.findAll(filter)
    }

    // TODO: Pagination
    async findConflicting(filter: IFindConflictingFilter) {
        return this.implementation.findConflicting(filter)
    }

    async delete(id: number) {
        return this.implementation.delete(id)
    }
}
