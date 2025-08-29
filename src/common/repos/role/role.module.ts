import { Module } from '@nestjs/common'
import { RoleRepository } from './role.service'
import { ROLE_REPO_IMPLEMENTATION } from './role.constants'
import { SequelizeModule } from '@nestjs/sequelize'
import { PostgresImplementation } from './postgres/postgres.implementation'
import { Role } from './postgres/role.model'
import { UserRole } from './postgres/user-role.model'

@Module({
    imports: [SequelizeModule.forFeature([Role, UserRole])],
    providers: [
        RoleRepository,
        {
            provide: ROLE_REPO_IMPLEMENTATION,
            useClass: PostgresImplementation,
        },
    ],
    exports: [RoleRepository],
})
export class RoleRepositoryModule {}
