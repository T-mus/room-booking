import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { getPostgresConfig } from './config/postgres.config'
import { SequelizeModule } from '@nestjs/sequelize'
import { JwtAuthModule } from './modules/jwt-auth/jwt-auth.module'
import { RoomModule } from './modules/room/room.module'
import { JwtModule } from '@nestjs/jwt'
import { getJwtConfig } from './config/jwt.config'
import { BookingsModule } from './modules/bookings/bookings.module'

@Module({
    imports: [
        ConfigModule.forRoot({ envFilePath: `.${process.env.NODE_ENV}.env`, isGlobal: true }),
        SequelizeModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: getPostgresConfig,
        }),
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: getJwtConfig,
            global: true,
        }),
        JwtAuthModule,
        RoomModule,
        BookingsModule,
    ],
    controllers: [],
    providers: [],
    exports: [],
})
export class AppModule {}
