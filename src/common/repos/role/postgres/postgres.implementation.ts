import { Injectable } from '@nestjs/common'
import { IRoleRepository, ICreateRoleDto } from '../role.types'
import { InjectModel } from '@nestjs/sequelize'
import { Role } from './role.model'

@Injectable()
export class PostgresImplementation implements IRoleRepository {
    constructor(@InjectModel(Role) private readonly userModel: typeof Role) {}

    async create(dto: ICreateRoleDto) {
        return this.userModel.create(dto)
    }

    async findOne(name: string) {
        return this.userModel.findOne({ where: { name } })
    }
}
