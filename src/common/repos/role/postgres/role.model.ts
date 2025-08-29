import { BelongsToMany, Column, DataType, Model, Table } from 'sequelize-typescript'
import { User } from '../../user/postgres/user.model'
import { UserRole } from './user-role.model'

@Table({ tableName: 'roles' })
export class Role extends Model<Role> {
    @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
    id: number

    @Column({ type: DataType.STRING, unique: true })
    name: string

    @BelongsToMany(() => User, () => UserRole)
    users: User[]
}
