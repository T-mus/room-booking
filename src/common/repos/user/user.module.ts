import { Module } from '@nestjs/common'
import { UserRepository } from './user.service'
import { USER_REPO_IMPLEMENTATION } from './user.constants'
import { SequelizeModule } from '@nestjs/sequelize'
import { PostgresImplementation } from './postgres/postgres.implementation'
import { User } from './postgres/user.model'
import { UserRole } from '../role/postgres/user-role.model'

@Module({
    imports: [SequelizeModule.forFeature([User, UserRole])],
    providers: [
        UserRepository,
        {
            provide: USER_REPO_IMPLEMENTATION,
            useClass: PostgresImplementation,
        },
    ],
    exports: [UserRepository],
})
export class UserRepositoryModule {}
