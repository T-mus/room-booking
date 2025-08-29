import { RefreshToken } from './postgres/refresh-token.model'

export interface ICreateRefreshTokenDto {
    userId: number
    token: string
}

export interface IFindOneRefreshTokenFilter {
    userId?: number
    token?: string
}

export interface IRefreshTokenRepository {
    create(dto: ICreateRefreshTokenDto): Promise<RefreshToken>
    findOne(filter: IFindOneRefreshTokenFilter): Promise<RefreshToken | null>
    updateOne(userId: number, token: string): Promise<RefreshToken | null>
}
