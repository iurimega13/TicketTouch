import { Body, Controller, Get, NotFoundException, Param, Post, UsePipes, ValidationPipe } from '@nestjs/common'; // Importa decorators e módulos do NestJS
import { CreateUserDto } from './dtos/createUser.dto'; // Importa o DTO para criar um usuário
import { UserService } from './user.service'; // Importa o serviço UserService
import { UserEntity } from './entities/user.entity'; // Importa a classe UserEntity
import { ReturnUserDto } from './dtos/returnUser.dto';

@Controller('user') // Define o prefixo para as rotas controladas por este controlador
export class UserController {

    constructor(private readonly userService: UserService) {} // Injeta o serviço UserService no construtor
    @UsePipes(ValidationPipe) // Aplica o ValidationPipe para validar os dados recebidos no corpo da requisição
    @Post() // Define um método POST para criar um novo usuário
    async createUser(@Body() createUser: CreateUserDto): Promise<UserEntity> { 
        return this.userService.createUser(createUser); // Chama o método createUser do serviço UserService
    }

    @Get() // Define um método GET para obter todos os usuários
    async getAllUsers(): Promise<ReturnUserDto[]> {
        return (await this.userService.getAllUsers()).map((UserEntity) => new ReturnUserDto(UserEntity)); // Chama o método getAllUsers do serviço UserService
    }

    @Get(':id')
    async getUserById(@Param('id') id: string): Promise<ReturnUserDto> {
        const user = await this.userService.findById(id);
        if (!user) {
            throw new NotFoundException(`User with ID ${id} not found`);
        }
    return new ReturnUserDto(user);
  }
}