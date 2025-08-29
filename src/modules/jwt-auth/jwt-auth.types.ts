export type AuthTokens = { accessToken: string; refreshToken: string }

export type TokenPayload = { id: number; email: string; roles: string[] }
