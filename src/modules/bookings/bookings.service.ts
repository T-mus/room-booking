import { Injectable, ForbiddenException, NotFoundException } from '@nestjs/common'
import { BookingRepository } from '../../common/repos/booking/booking.service'
import { ICreateBookingDto } from '../../common/repos/booking/booking.types'
import { RoomRepository } from '../../common/repos/room/room.service'
import { TokenPayload } from '../jwt-auth/jwt-auth.types'

// prettier-ignore
@Injectable()
export class BookingsService {
    constructor(
        private readonly bookingRepo: BookingRepository,
        private readonly roomRepo: RoomRepository,
    ) {}

    async createBooking(dto: ICreateBookingDto) {
        try {
            const { roomId, startTime, endTime } = dto

            const room = await this.roomRepo.findById(roomId)
            if (!room) throw new NotFoundException('Room not found')

            const conflicting = await this.bookingRepo.findConflicting({ roomId, startTime, endTime })
            if (conflicting.length > 0) {
                throw new ForbiddenException('Room is already booked at this time')
            }
            return this.bookingRepo.create(dto)
        } catch (error) {
            console.error('[Error in BookingService => createBooking]:\n', error)
            throw error
        }
    }

    async getBookings(user: TokenPayload) {
        try {
            if (user.roles.includes('ADMIN')) {
                return this.bookingRepo.findAll()
            }
            return this.bookingRepo.findAll({ userId: user.id })
        } catch (error) {
            console.error('[Error in BookingService => getBookings]:\n', error)
            throw error
        }
    }

    async deleteBooking(bookingId: number, user: TokenPayload) {
        try {
            const booking = await this.bookingRepo.findById(bookingId)
            if (!booking) throw new NotFoundException('Booking not found')

            if (!user.roles.includes('ADMIN') || booking.userId !== user.id) {
                throw new ForbiddenException('You cannot delete this booking')
            }

            await this.bookingRepo.delete(bookingId)
            return { success: true }
        } catch (error) {
            console.error('[Error in BookingService => getBookings]:\n', error)
            throw error
        }
    }
}
