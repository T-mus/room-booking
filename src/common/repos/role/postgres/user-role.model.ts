import { Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript'
import { Role } from './role.model'
import { User } from '../../user/postgres/user.model'

@Table({ tableName: 'user_roles' })
export class UserRole extends Model<UserRole> {
    @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
    id: number

    @ForeignKey(() => Role)
    @Column({ type: DataType.INTEGER })
    roleId: number

    @ForeignKey(() => User)
    @Column({ type: DataType.INTEGER })
    userId: number
}
