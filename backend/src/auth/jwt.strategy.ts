import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { JwtPayload } from './interfaces/jwt-payload.interface'; // Crie esse interface conforme necessário

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET, // A mesma chave secreta usada para assinar o token
    });
  }

  async validate(payload: JwtPayload) {
    // Você pode adicionar lógica aqui para encontrar o usuário com base no payload, se necessário
    return { userId: payload.sub, username: payload.username }; // Retorna o que você deseja na request.user
  }
}
