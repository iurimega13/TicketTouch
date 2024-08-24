import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common'; // Importa decorators e módulos do NestJS
import { LoginDto } from './dtos/login.dto'; // Importa o DTO para login
import { AuthService } from './auth.service'; // Importa o serviço AuthService
import { ReturnLogin } from './dtos/returnLogin.dto'; // Importa o DTO de retorno para o login

@Controller('auth') 
export class AuthController {
    constructor(private readonly authService: AuthService) {} // Injeta o serviço AuthService no construtor

    @UsePipes(ValidationPipe) // Aplica o ValidationPipe para validar os dados recebidos no corpo da requisição
    @Post() // Define um método POST para realizar o login
    async login(@Body() loginDto: LoginDto): Promise<ReturnLogin> { // Define um manipulador de rota para a rota de login
        return this.authService.login(loginDto); // Chama o método de login do serviço AuthService e retorna o resultado
    }
}
