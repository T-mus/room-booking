import { Inject, Injectable } from '@nestjs/common'
import { REFRESH_TOKEN_REPO_IMPLEMENTATION } from './resfresh-token.constants'
import {
    IRefreshTokenRepository,
    ICreateRefreshTokenDto,
    IFindOneRefreshTokenFilter,
} from './resfresh-token.types'

@Injectable()
export class RefreshTokenRepository implements IRefreshTokenRepository {
    constructor(
        @Inject(REFRESH_TOKEN_REPO_IMPLEMENTATION)
        private readonly implementation: IRefreshTokenRepository,
    ) {}

    async create(dto: ICreateRefreshTokenDto) {
        return this.implementation.create(dto)
    }

    async findOne(filter: IFindOneRefreshTokenFilter) {
        return this.implementation.findOne(filter)
    }

    async updateOne(userId: number, token: string) {
        return this.implementation.updateOne(userId, token)
    }
}
