// import {Injectable, NestMiddleware, UnauthorizedException } from "@nestjs/common";
// import { JwtService } from "@nestjs/jwt";
// import { NextFunction } from "express";
// import * as process from "process"
//
//
// @Injectable()
// export class JwtUserMiddleware implements NestMiddleware {
//
//     constructor(private readonly jwtService: JwtService) {
//     }
//
//     use(request: Request, response: Response, next: NextFunction) {
//
//         try {
//             const decodedToken = this.jwtService.verify(token, { secret: process.env.JWT_SECRET_KEY })
//             request["auth-user"] = decodedToken
//             next()
//         } catch (error) {
//             throw new UnauthorizedException("User is not authorized")
//         }
//
//     }
//
// }