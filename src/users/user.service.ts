import { Injectable } from '@nestjs/common';
import { hash } from 'bcrypt';
import { createUserDto } from './dtos/createUser.dto';
import {UserEntity} from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm'; 


@Injectable()
export class UserService {

    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>, // Fix the parameter name to use the correct type
    ){}
   

    async createUser(createUserDto: createUserDto): Promise<UserEntity> {

        // encripitando a senha
        const saltOrRounds = 10;
        const passwordHashed = await hash(createUserDto.password, saltOrRounds);
        

        return this.userRepository.save({
            ...createUserDto,
            password: passwordHashed,
        });
        }

    async getAllUsers(): Promise<UserEntity[]> {
        return this.userRepository.find();
    }
}
