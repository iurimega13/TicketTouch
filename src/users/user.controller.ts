import { Body, Controller, Get, Post } from '@nestjs/common'; // Importa decorators e módulos do NestJS
import { createUserDto } from './dtos/createUser.dto'; // Importa o DTO para criar um usuário
import { UserService } from './user.service'; // Importa o serviço UserService
import { UserEntity } from './entities/user.entity'; // Importa a classe UserEntity

@Controller('user') // Define o prefixo para as rotas controladas por este controlador
export class UserController {

    constructor(private readonly userService: UserService) {} // Injeta o serviço UserService no construtor

    @Post() // Define um método POST para criar um novo usuário
    async createUser(@Body() createUser: createUserDto): Promise<UserEntity> { 
        return this.userService.createUser(createUser); // Chama o método createUser do serviço UserService
    }

    @Get() // Define um método GET para obter todos os usuários
    async getAllUsers(): Promise<UserEntity[]> {
        return this.userService.getAllUsers(); // Chama o método getAllUsers do serviço UserService
    }
}
