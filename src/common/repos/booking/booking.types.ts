import { Booking } from './postgres/booking.model'

export interface ICreateBookingDto {
    userId: number
    roomId: number
    startTime: Date
    endTime: Date
}

export interface IFindBookingsFilter {
    userId?: number
    roomId?: number
}

export interface IFindConflictingFilter {
    roomId: number
    startTime: Date
    endTime: Date
}

export interface IBookingRepository {
    create(dto: ICreateBookingDto): Promise<Booking>
    findById(id: number): Promise<Booking | null>
    findAll(filter?: IFindBookingsFilter): Promise<Booking[]>
    findConflicting(filter: IFindConflictingFilter): Promise<Booking[]>
    delete(id: number): Promise<number>
}
