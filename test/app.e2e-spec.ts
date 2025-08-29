import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import * as request from 'supertest'
import * as cookieParser from 'cookie-parser'
import mongoose from 'mongoose'

// App-specific imports
import { AppModule } from './../src/app.module'
import { getConnectionString } from './common.utils'

// Constants & mocks

describe('AppController (e2e)', () => {
    let app: INestApplication

    // prettier-ignore
    beforeAll(async () => {
        await mongoose.connect(getConnectionString())

        const moduleFixture: TestingModule = await Test.createTestingModule({ imports: [AppModule]})
            .compile()

        app = moduleFixture.createNestApplication()
        app.use(cookieParser())

        await app.init()

    })

    afterAll(async () => {
        if (mongoose.connection.readyState === 1) {
            await mongoose.connection.db.dropDatabase()
        }
        await app.close()
        await mongoose.connection.close()
    })
})
