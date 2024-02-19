import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { LoginDto } from './dtos/login.dto';
import { AuthService } from './auth.service';
import { ReturnLogin } from './dtos/returnLogin.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @UsePipes(ValidationPipe) // Aplica o ValidationPipe com a opção transform: true
    @Post()
    async login(@Body() loginDto: LoginDto): Promise<ReturnLogin> {
        return this.authService.login(loginDto);    }
}
