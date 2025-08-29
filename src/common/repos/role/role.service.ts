import { Inject, Injectable } from '@nestjs/common'
import { ROLE_REPO_IMPLEMENTATION } from './role.constants'
import { ICreateRoleDto, IRoleRepository } from './role.types'

@Injectable()
export class RoleRepository implements IRoleRepository {
    constructor(
        @Inject(ROLE_REPO_IMPLEMENTATION)
        private readonly implementation: IRoleRepository,
    ) {}

    async create(dto: ICreateRoleDto) {
        return this.implementation.create(dto)
    }

    async findOne(name: string) {
        return this.implementation.findOne(name)
    }
}
