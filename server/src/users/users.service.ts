import { Injectable } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {User} from "./users.entity";
import {Repository} from "typeorm";
import {CreateUserDto} from "./dto/create-user.dto";

@Injectable()
export class UsersService {

    constructor(@InjectRepository(User)
                private readonly userRepository: Repository<User>) {
    }

    async createUser(createUserDto: CreateUserDto) {
        const user = this.userRepository.create(createUserDto)

        return await this.userRepository.save(user)
    }

    async getUserByEmail(email: string) {
        const user = await this.userRepository.findOne({
            where: {email: email}
        })

        return user
    }

    async getUserById(id: string) {
        const user = await this.userRepository.findOne({
            where: {id: id}
        })

        return user
    }

    async getUserByUsername(username: string) {
        const user = await this.userRepository.findOne({
            where: {username: username}
        })

        return user
    }

    async deleteUser(id: string): Promise<User> {
        const user = await this.getUserById(id)

        return this.userRepository.remove(user)
    }

    async getUsers(): Promise<User[]> {
        return await this.userRepository.find()
    }

}
