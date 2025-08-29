import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript'
import { User } from '../../user/postgres/user.model'
import { Room } from '../../room/postgres/room.model'

@Table({ tableName: 'bookings' })
export class Booking extends Model<Booking> {
    @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
    id: number

    @ForeignKey(() => User)
    @Column({ type: DataType.INTEGER, allowNull: false })
    userId: number

    @ForeignKey(() => Room)
    @Column({ type: DataType.INTEGER, allowNull: false })
    roomId: number

    @Column({ type: DataType.DATE, allowNull: false })
    startTime: Date

    @Column({ type: DataType.DATE, allowNull: false })
    endTime: Date

    @BelongsTo(() => User)
    user: User

    @BelongsTo(() => Room)
    room: Room
}
