import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import * as cookieParser from 'cookie-parser'

async function start() {
    const PORT = process.env.PORT || 5000
    const app = await NestFactory.create(AppModule)

    app.use(cookieParser())

    await app.listen(PORT, () =>
        console.log(
            '\x1b[1m\x1b[30m\x1b[48;2;187;154;247m%s\x1b[0m',
            ` Server started on port ${PORT} `,
        ),
    )
}
start()
