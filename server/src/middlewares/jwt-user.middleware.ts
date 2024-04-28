import {Injectable, NestMiddleware, UnauthorizedException} from "@nestjs/common";
import {JwtService} from "@nestjs/jwt";
import {Request, Response, NextFunction} from "express";

@Injectable()
export class JwtUserMiddleware implements NestMiddleware {

    constructor(private readonly jwtService: JwtService) {
    }

    use(request: Request, response: Response, next: NextFunction) {

        const token = request.headers.authorization

        try {
            const decodedToken = this.jwtService.decode(token)
            request["user"] = decodedToken
            console.log(decodedToken)
            next()
        } catch (error) {
            throw new UnauthorizedException("User is not authorized")
        }

    }
}