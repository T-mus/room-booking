import { Injectable } from '@nestjs/common'
import { IUserRepository, ICreateUserDto, IFindOneUserFilter } from '../user.types'
import { InjectModel } from '@nestjs/sequelize'
import { User } from './user.model'
import { Role } from '../../role/postgres/role.model'

@Injectable()
export class PostgresImplementation implements IUserRepository {
    constructor(@InjectModel(User) private readonly userModel: typeof User) {}

    async create(dto: ICreateUserDto) {
        return this.userModel.create(dto)
    }

    async createWithRole(dto: ICreateUserDto, roleId: number) {
        const user = await this.userModel.create(dto)

        await user.$set('roles', [roleId])
        await user.save()

        return user
    }

    async findOne(filter: IFindOneUserFilter) {
        return this.userModel.findOne({
            where: { ...filter },
            include: [
                {
                    model: Role,
                    through: { attributes: [] },
                },
            ],
        })
    }
}
