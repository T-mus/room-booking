import { Module } from '@nestjs/common'
import { JwtAuthService } from './jwt-auth.service'
import { JwtAuthController } from './jwt-auth.controller'
import { UserRepositoryModule } from '../../common/repos/user/user.module'
import { RefreshTokenRepositoryModule } from '../../common/repos/resfresh-token/resfresh-token.module'
import { TokenService } from './token.service'
import { RoleRepositoryModule } from '../../common/repos/role/role.module'

@Module({
    imports: [UserRepositoryModule, RefreshTokenRepositoryModule, RoleRepositoryModule],
    controllers: [JwtAuthController],
    providers: [JwtAuthService, TokenService],
})
export class JwtAuthModule {}
