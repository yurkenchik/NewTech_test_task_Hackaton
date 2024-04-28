import {Controller, Get, HttpException, HttpStatus, UseGuards} from '@nestjs/common';
import {UsersService} from "./users.service";
import {AuthUserGuard} from "../guards/auth-user.guard";

@Controller('users')
export class UsersController {

    constructor(private readonly usersService: UsersService) {
    }

    @UseGuards(AuthUserGuard)
    @Get("/get-users")
    async getUsers() {
        try {
            return this.usersService.getUsers()
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

}
