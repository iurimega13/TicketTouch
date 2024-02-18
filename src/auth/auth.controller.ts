import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { LoginDto } from './dtos/login.dto';
import { AuthService } from './auth.service';
import { ReturnUserDto } from 'src/users/dtos/returnUser.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @UsePipes(ValidationPipe) // Aplica o ValidationPipe com a opção transform: true
    @Post()
    async login(@Body() loginDto: LoginDto): Promise<ReturnUserDto> {
        return new ReturnUserDto(await this.authService.login(loginDto));
    }
}
