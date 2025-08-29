import { Module } from '@nestjs/common'
import { RefreshTokenRepository } from './resfresh-token.service'
import { REFRESH_TOKEN_REPO_IMPLEMENTATION } from './resfresh-token.constants'
import { SequelizeModule } from '@nestjs/sequelize'
import { RefreshToken } from './postgres/refresh-token.model'
import { PostgresImplementation } from './postgres/postgres.implementation'

@Module({
    imports: [SequelizeModule.forFeature([RefreshToken])],
    providers: [
        RefreshTokenRepository,
        {
            provide: REFRESH_TOKEN_REPO_IMPLEMENTATION,
            useClass: PostgresImplementation,
        },
    ],
    exports: [RefreshTokenRepository],
})
export class RefreshTokenRepositoryModule {}
