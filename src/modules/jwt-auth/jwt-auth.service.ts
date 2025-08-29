import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common'
import { ICreateUserDto } from '../../common/repos/user/user.types'
import { UserRepository } from '../../common/repos/user/user.service'
import { hash, compare } from 'bcryptjs'
import { TokenService } from './token.service'
import { RefreshTokenRepository } from '../../common/repos/resfresh-token/resfresh-token.service'
import { RoleRepository } from '../../common/repos/role/role.service'

@Injectable()
export class JwtAuthService {
    constructor(
        private readonly tokenService: TokenService,
        private readonly userRepo: UserRepository,
        private readonly refreshTokenRepo: RefreshTokenRepository,
        private readonly roleRepo: RoleRepository,
    ) {}

    async register({ email, password }: ICreateUserDto) {
        try {
            const candidate = await this.userRepo.findOne({ email })
            if (candidate) {
                throw new BadRequestException(`User with email ${email} already exists`)
            }
            const hashedPassword = await hash(password, 8)

            const role = await this.roleRepo.findOne('USER')
            const user = await this.userRepo.createWithRole(
                { email, password: hashedPassword },
                role.id,
            )
            const tokens = this.tokenService.generateTokens({
                id: user.id,
                email,
                roles: [role.name],
            })

            await this.tokenService.saveRefreshToken(user.id, tokens.refreshToken)
            return { ...tokens, user }
        } catch (error) {
            console.error('[Error in JwtAuthService => register]:\n', error)
            throw error
        }
    }

    async login({ email, password }: ICreateUserDto) {
        try {
            const user = await this.userRepo.findOne({ email })
            if (!user) {
                throw new BadRequestException(`User with email ${email} was not found`)
            }
            const isPassEqual = await compare(password, user.password)
            if (!isPassEqual) {
                throw new BadRequestException('Incorrect password')
            }
            const tokens = this.tokenService.generateTokens({
                id: user.id,
                email,
                roles: user.roles.map((r) => r.name),
            })
            await this.tokenService.saveRefreshToken(user.id, tokens.refreshToken)

            return { ...tokens, user }
        } catch (error) {
            console.error('[Error in JwtAuthService => login]:\n', error)
            throw error
        }
    }

    async refreshTokens(refreshToken: string) {
        try {
            if (!refreshToken) {
                throw new UnauthorizedException()
            }
            const userPayload = await this.tokenService.verifyToken(refreshToken)
            const dbToken = await this.refreshTokenRepo.findOne({ token: refreshToken })

            if (!userPayload || !dbToken) {
                throw new UnauthorizedException()
            }
            const tokens = this.tokenService.generateTokens({
                id: userPayload.id,
                email: userPayload.email,
                roles: userPayload.roles,
            })
            await this.tokenService.saveRefreshToken(userPayload.id, tokens.refreshToken)

            return tokens
        } catch (error) {
            console.error('[Error in JwtAuthService => refreshTokens]:\n', error)
            throw error
        }
    }
}
