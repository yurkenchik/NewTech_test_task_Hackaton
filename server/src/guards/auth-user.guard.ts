import {CanActivate, ExecutionContext, Injectable, UnauthorizedException} from "@nestjs/common";
import {JwtService} from "@nestjs/jwt";
import {Observable} from "rxjs";


@Injectable()
export class AuthUserGuard implements CanActivate {

    unauthorizedMessage = "user is not authorized"

    constructor(private jwtService: JwtService) {}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {

        const req = context.switchToHttp().getRequest()
        try {
            const authHeader = req.headers.authorization
            const bearer = authHeader.split(" ")[0]
            const token = authHeader.split(" ")[1]

            if (bearer !== "Bearer" || !token) {
                throw new UnauthorizedException({message: this.unauthorizedMessage})
            }

            const user = this.jwtService.verify(token, { secret: "secret" })

            req.user = user
            return user.role === "USER"
        } catch (error) {
            console.log(error)
            throw new UnauthorizedException({message: this.unauthorizedMessage})
        }
    }
}
