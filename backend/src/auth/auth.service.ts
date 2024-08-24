import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common'; // Importa o decorator Injectable e NotFoundException do NestJS
import { UserEntity } from '../users/entities/user.entity'; // Importa a classe UserEntity
import { LoginDto } from './dtos/login.dto'; // Importa o DTO para login
import { UserService } from '../users/user.service'; // Importa o serviço UserService
import { compare } from 'bcrypt'; // Importa a função compare do bcrypt para comparar senhas
import { ReturnLogin } from './dtos/returnLogin.dto';
import { JwtService } from '@nestjs/jwt'; // Importa a classe JwtService do pacote @nestjs/jwt
import { ReturnUserDto } from '../users/dtos/returnUser.dto';
import { LoginPayload } from './dtos/loginPayload.dto';

@Injectable() 
export class AuthService {
    constructor(private readonly userService: UserService, private readonly jwtService: JwtService) {} // Injeta o serviço UserService e JwtService no construtor

    async login(LoginDto: LoginDto): Promise<ReturnLogin> {
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
        
        // Retorna um objeto com o token JWT e o usuário
        return {
            acessToken: this.jwtService.sign( {...new LoginPayload(user)} ), // Gera um token JWT com base no payload do usuário
            user: new ReturnUserDto(user) // Retorna o usuário
        };
    }
}
