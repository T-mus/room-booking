import {
    Injectable,
    CanActivate,
    ExecutionContext,
    UnauthorizedException,
    ForbiddenException,
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { JwtService } from '@nestjs/jwt'
import { Observable } from 'rxjs'
import { METADATA_ROLES_KEY } from '../constants/metadata.constants'

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(
        private jwtService: JwtService,
        private reflector: Reflector,
    ) {}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const req = context.switchToHttp().getRequest()
        const requiredRoles = this.reflector.getAllAndOverride<string[]>(METADATA_ROLES_KEY, [
            context.getHandler(),
            context.getClass(),
        ])
        if (!requiredRoles) {
            return true
        }
        const authHeader = req.headers.authorization
        if (!authHeader) {
            throw new UnauthorizedException()
        }
        const [bearer, token] = authHeader.split(' ')
        if (bearer !== 'Bearer' || !token) {
            throw new UnauthorizedException()
        }
        const user = this.jwtService.decode(token)
        req.user = user

        const hasRole = user.roles?.some((role) => requiredRoles.includes(role))
        if (!hasRole) {
            throw new ForbiddenException('Access denied')
        }
        return true
    }
}
