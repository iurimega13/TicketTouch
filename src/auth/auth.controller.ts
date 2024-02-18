import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common'; // Importa decorators e módulos do NestJS
import { LoginDto } from './dtos/login.dto'; // Importa o DTO para login
import { AuthService } from './auth.service'; // Importa o serviço AuthService
import { ReturnUserDto } from 'src/users/dtos/returnUser.dto'; // Importa o DTO ReturnUserDto

@Controller('auth') // Define o prefixo para as rotas controladas por este controlador
export class AuthController {
    constructor(
        private readonly authService: AuthService,
    ) { }

    @UsePipes(ValidationPipe) // Aplica o ValidationPipe para validar os dados recebidos no corpo da requisição
    @Post() // Define um método POST para realizar a autenticação
    async login(@Body() LoginDto: LoginDto): Promise<ReturnUserDto> {
        // Chama o método de login do serviço AuthService, espera o resultado e retorna um ReturnUserDto com o resultado
        return new ReturnUserDto(await this.authService.login(LoginDto));
    }
}
