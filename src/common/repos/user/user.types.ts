import { User } from './postgres/user.model'

export interface ICreateUserDto {
    email: string
    password: string
}

export interface IFindOneUserFilter {
    id?: number
    email?: string
}

export interface IUserRepository {
    create(dto: ICreateUserDto): Promise<User>
    createWithRole(dto: ICreateUserDto, roleId: number): Promise<User>
    findOne(filter: IFindOneUserFilter): Promise<User | null>
}
