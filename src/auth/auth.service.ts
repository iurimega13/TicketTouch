import { Injectable, NotFoundException } from '@nestjs/common'; // Importa o decorator Injectable e NotFoundException do NestJS
import { UserEntity } from 'src/users/entities/user.entity'; // Importa a classe UserEntity
import { LoginDto } from './dtos/login.dto'; // Importa o DTO para login
import { UserService } from 'src/users/user.service'; // Importa o serviço UserService
import { compare } from 'bcrypt'; // Importa a função compare do bcrypt para comparar senhas

@Injectable() // Indica que a classe é um serviço injetável
export class AuthService {
    constructor(private userService: UserService) {} // Injeta o serviço UserService no construtor

    async login(LoginDto: LoginDto): Promise<UserEntity> {
        // Busca o usuário pelo registro fornecido no DTO de login
        const user: UserEntity | undefined = await this.userService.findByRegistration(LoginDto.registration).catch(() => undefined);

        // Compara a senha fornecida com a senha armazenada no banco de dados
        const isMatch = await compare(LoginDto.password, user?.password || '');

        // Se o usuário não existir ou a senha estiver incorreta, lança NotFoundException
        if (!user || !isMatch) {
            throw new NotFoundException(`Usuário com registro ${LoginDto.registration} não encontrado`);
        }

        return user; // Retorna o usuário autenticado
    }
}
