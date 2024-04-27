import {Injectable, NestMiddleware, UnauthorizedException} from "@nestjs/common";
import {JwtService} from "@nestjs/jwt";
import {NextFunction} from "express";

@Injectable()

export class jwtUserMiddleware implements NestMiddleware {

    constructor(private readonly jwtService: JwtService) {
    }

    use(request: Request, response: Response, next: NextFunction) {

        const token = request.headers.get("Authorization")

        try {
            const decodedToken = this.jwtService.decode(token)
            request["auth-user"] = decodedToken
            next()
        } catch (error) {
            throw new UnauthorizedException("User is not authorized")
        }

    }
}