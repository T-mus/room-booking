import { Body, Controller, Get, HttpCode, Post, Req, Res } from '@nestjs/common'
import { JwtAuthService } from './jwt-auth.service'
import { ICreateUserDto } from 'src/common/repos/user/user.types'
import { toMs } from 'ms-typescript'
import { Request, Response } from 'express'
import { ConfigService } from '@nestjs/config'

@Controller('jwt-auth')
export class JwtAuthController {
    constructor(
        private readonly configService: ConfigService,
        private readonly jwtAuthService: JwtAuthService,
    ) {}

    @Post('register')
    async register(
        @Body(/* Validation Pipe */) dto: ICreateUserDto,
        @Res({ passthrough: true }) res: Response,
    ) {
        const { accessToken, refreshToken } = await this.jwtAuthService.register(dto)
        this.setAuthCookies(res, refreshToken)

        return { accessToken }
    }

    @HttpCode(200)
    @Post('login')
    async login(
        @Body(/* Validation Pipe */) dto: ICreateUserDto,
        @Res({ passthrough: true }) res: Response,
    ) {
        const { accessToken, refreshToken } = await this.jwtAuthService.login(dto)
        this.setAuthCookies(res, refreshToken)

        return { accessToken }
    }

    @Get('refresh')
    async refreshTokens(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
        const { accessToken, refreshToken } = await this.jwtAuthService.refreshTokens(
            req.cookies['refreshToken'],
        )
        this.setAuthCookies(res, refreshToken)
        return { accessToken }
    }

    private setAuthCookies(res: Response, refreshToken: string): void {
        res.cookie('refreshToken', refreshToken, {
            maxAge: toMs(this.configService.get<string>('JWT_REFRESH_TOKEN_EXPIRATION', '30d')), // parse into ms
            httpOnly: true,
            sameSite: 'none',
            secure: this.configService.get('NODE_ENV') === 'production',
        })
    }
}
