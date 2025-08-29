import { BelongsToMany, Column, DataType, HasOne, Model, Table } from 'sequelize-typescript'
import { RefreshToken } from '../../resfresh-token/postgres/refresh-token.model'
import { Role } from '../../role/postgres/role.model'
import { UserRole } from '../../role/postgres/user-role.model'

@Table({ tableName: 'users' })
export class User extends Model<User> {
    @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
    id: number

    @Column({ type: DataType.STRING, unique: true, allowNull: false })
    email: string

    @Column({ type: DataType.STRING, allowNull: false })
    password: string

    @HasOne(() => RefreshToken)
    refreshToken: RefreshToken

    @BelongsToMany(() => Role, () => UserRole)
    roles: Role[]
}
