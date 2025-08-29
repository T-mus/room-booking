import { Injectable } from '@nestjs/common'
import {
    IRefreshTokenRepository,
    ICreateRefreshTokenDto,
    IFindOneRefreshTokenFilter,
} from '../resfresh-token.types'
import { InjectModel } from '@nestjs/sequelize'
import { RefreshToken } from './refresh-token.model'
import { WhereOptions } from 'sequelize'

@Injectable()
export class PostgresImplementation implements IRefreshTokenRepository {
    constructor(
        @InjectModel(RefreshToken) private readonly refreshTokenModel: typeof RefreshToken,
    ) {}

    async create(dto: ICreateRefreshTokenDto) {
        return this.refreshTokenModel.create(dto)
    }

    async findOne(filter: IFindOneRefreshTokenFilter) {
        return this.refreshTokenModel.findOne({ where: filter as WhereOptions<RefreshToken> })
    }

    async updateOne(userId: number, token: string) {
        const existing = await this.refreshTokenModel.findOne({ where: { userId } })
        if (!existing) return null

        existing.token = token
        return existing.save()
    }
}
