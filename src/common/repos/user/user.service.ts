import { Inject, Injectable } from '@nestjs/common'
import { USER_REPO_IMPLEMENTATION } from './user.constants'
import { ICreateUserDto, IFindOneUserFilter, IUserRepository } from './user.types'

@Injectable()
export class UserRepository implements IUserRepository {
    constructor(
        @Inject(USER_REPO_IMPLEMENTATION)
        private readonly implementation: IUserRepository,
    ) {}

    async create(dto: ICreateUserDto) {
        return this.implementation.create(dto)
    }

    async createWithRole(dto: ICreateUserDto, roleId: number) {
        return this.implementation.createWithRole(dto, roleId)
    }

    async findOne(filter: IFindOneUserFilter) {
        return this.implementation.findOne(filter)
    }
}
