import { Role } from './postgres/role.model'

export interface ICreateRoleDto {
    name: string
}

export interface IRoleRepository {
    create(dto: ICreateRoleDto): Promise<Role>
    findOne(name: string): Promise<Role | null>
    // findAll(): Promise<Role[]>
}
