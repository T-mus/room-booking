import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript'
import { Booking } from '../../booking/postgres/booking.model'

@Table({ tableName: 'rooms' })
export class Room extends Model<Room> {
    @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
    id: number

    @Column({ type: DataType.STRING, allowNull: false, unique: true })
    name: string

    @Column({ type: DataType.INTEGER, allowNull: false })
    capacity: number

    @HasMany(() => Booking)
    bookings: Booking[]
}
