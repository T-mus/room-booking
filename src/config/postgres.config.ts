import { ConfigService } from '@nestjs/config'
import { SequelizeModuleOptions } from '@nestjs/sequelize'

// prettier-ignore
export const getPostgresConfig = (configService: ConfigService): SequelizeModuleOptions => {
    return {
        dialect: 'postgres',
        host: process.env.POSTGRES_HOST,
        port: Number(process.env.POSTGRES_PORT),
        username: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
        database: process.env.POSTGRES_DB,
        autoLoadModels: true,
        // synchronize: true,
        logging: false,

        hooks: {
            afterConnect() {
                console.log(
                    '\x1b[1m\x1b[30m\x1b[48;2;139;233;161m%s\x1b[0m',
                    ' Successfully connected to the Postgres database. ',
                )
            }
        }
    }
}
