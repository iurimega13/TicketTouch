import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './dtos/login.dto';
import { UserService } from '../users/user.service';
import { compare } from 'bcrypt';
import { ReturnLogin } from './dtos/returnLogin.dto';
import { JwtService } from '@nestjs/jwt';
import { ReturnUserDto } from '../users/dtos/returnUser.dto';
import { LoginPayload } from './dtos/loginPayload.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto): Promise<ReturnLogin> {
    const user = await this.userService.findByUsername(loginDto.username);

    if (!user) {
      throw new NotFoundException(`Usuário com registro ${loginDto.username} não encontrado`);
    }

    const isMatch = await compare(loginDto.password, user.password);

    if (!isMatch) {
      throw new UnauthorizedException('Senha incorreta');
    }

    return {
      accessToken: this.jwtService.sign({ ...new LoginPayload(user) }),
      user: new ReturnUserDto(user),
    };
  }
}