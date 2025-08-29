import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import { TokenPayload } from './jwt-auth.types'
import { RefreshTokenRepository } from '../../common/repos/resfresh-token/resfresh-token.service'

@Injectable()
export class TokenService {
    constructor(
        private configService: ConfigService,
        private jwtService: JwtService,
        private readonly refreshTokenRepo: RefreshTokenRepository,
    ) {}

    generateTokens(payload: TokenPayload) {
        const accessTokenExp = this.configService.get<string>('JWT_ACCESS_TOKEN_EXP', '15m')
        const refreshTokenExp = this.configService.get<string>('JWT_REFRESH_TOKEN_EXP', '15d')

        const accessToken = this.jwtService.sign(payload, { expiresIn: accessTokenExp })
        const refreshToken = this.jwtService.sign(payload, { expiresIn: refreshTokenExp })

        return { accessToken, refreshToken }
    }

    async saveRefreshToken(userId: number, refreshToken: string) {
        const existingToken = await this.refreshTokenRepo.findOne({ userId })
        if (existingToken) {
            return this.refreshTokenRepo.updateOne(userId, refreshToken)
        }
        return this.refreshTokenRepo.create({ userId, token: refreshToken })
    }

    async verifyToken(token: string): Promise<TokenPayload> | null {
        try {
            return await this.jwtService.verifyAsync<TokenPayload>(token)
        } catch (err) {
            return null
        }
    }
}
