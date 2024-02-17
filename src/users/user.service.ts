import { Injectable } from '@nestjs/common';
import { hash } from 'bcrypt';
import { createUserDto } from './dtos/createUser.dto';
import {User} from './interfaces/user.interface';
import { log } from 'console';


@Injectable()
export class UserService {
    private users: User[] = [];


    async createUser(createUserDto: createUserDto): Promise<User> {

        // encripitando a senha
        const saltOrRounds = 10;
        const passwordHashed = await hash(createUserDto.password, saltOrRounds);
        

        // Gravando em memoria o usuário criado
        const user ={
            ...createUserDto,
            id: this.users.length + 1,
            password: passwordHashed,

        };
        this.users.push(user);


        return user;

        }

    async getAllUsers(): Promise<User[]> {
        return this.users;
    }
}
