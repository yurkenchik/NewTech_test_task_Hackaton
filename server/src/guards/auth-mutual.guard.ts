import {CanActivate, ExecutionContext, Injectable, UnauthorizedException} from "@nestjs/common";
import {JwtService} from "@nestjs/jwt";
import {Observable} from "rxjs";


@Injectable()
export class AuthMutualGuard implements CanActivate {

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

            const customer = this.jwtService.verify(token, { secret: "secret" })
            console.log(req)
            req.user = customer
            return customer.role === "ASSISTANT" || customer.role === "USER"
        } catch (error) {
            console.log(error)
            throw new UnauthorizedException({message: this.unauthorizedMessage})
        }
    }
}
