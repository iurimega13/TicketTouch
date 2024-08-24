import { LoginDto } from './dtos/login.dto';
import { UserService } from '../users/user.service';
import { ReturnLogin } from './dtos/returnLogin.dto';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private readonly userService;
    private readonly jwtService;
    constructor(userService: UserService, jwtService: JwtService);
    login(LoginDto: LoginDto): Promise<ReturnLogin>;
}
