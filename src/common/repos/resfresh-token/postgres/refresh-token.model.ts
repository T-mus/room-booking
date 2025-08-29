import { Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript'
import { User } from '../../user/postgres/user.model'

@Table({ tableName: 'refresh_tokens' })
export class RefreshToken extends Model<RefreshToken> {
    @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
    id: number

    @Column({ type: DataType.TEXT })
    token: string

    @ForeignKey(() => User)
    @Column({ type: DataType.INTEGER })
    userId: number
}
