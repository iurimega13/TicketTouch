import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common'; // Importa o decorator Injectable e NotFoundException do NestJS
import { UserEntity } from 'src/users/entities/user.entity'; // Importa a classe UserEntity
import { LoginDto } from './dtos/login.dto'; // Importa o DTO para login
import { UserService } from 'src/users/user.service'; // Importa o serviço UserService
import { compare } from 'bcrypt'; // Importa a função compare do bcrypt para comparar senhas

@Injectable() // Indica que a classe é um serviço injetável
export class AuthService {
    constructor(private readonly userService: UserService) {} // Injeta o serviço UserService no construtor

    async login(LoginDto: LoginDto): Promise<UserEntity> {
        // Busca o usuário pelo registro fornecido no DTO de login
        const user = await this.userService.findByRegistration(LoginDto.registration);
        
        // Se o usuário não for encontrado, lança NotFoundException
        if (!user) {
            throw new NotFoundException(`Usuário com registro ${LoginDto.registration} não encontrado`);
        }
    
        // Compara a senha fornecida com a senha armazenada no banco de dados
        const isMatch = await compare(LoginDto.password, user.password);
    
        // Se a senha estiver incorreta, lança UnauthorizedException
        if (!isMatch) {
            throw new UnauthorizedException('Senha incorreta');
        }
    
        return user; // Retorna o usuário autenticado
    }
}
