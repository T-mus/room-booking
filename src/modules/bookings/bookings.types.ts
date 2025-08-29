import { Request } from 'express'
import { TokenPayload } from '../jwt-auth/jwt-auth.types'

export type AuthRequest = Request & { user: TokenPayload }
