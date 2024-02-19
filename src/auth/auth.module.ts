import { Module } from '@nestjs/common'; // Importa o decorator Module do NestJS
import { AuthController } from './auth.controller'; // Importa o controlador AuthController
import { AuthService } from './auth.service'; // Importa o serviço AuthService
import { UserModule } from 'src/users/user.module'; // Importa o módulo UserModule
import { JwtModule } from '@nestjs/jwt';

@Module({ // Define o módulo AuthModule
  
  imports: [UserModule,
    JwtModule.registerAsync({
      useFactory: () => ({
        global: true,
        secret: process.env.JWT_SECRET, // Define a chave secreta para assinar o token JWT
        signOptions: { expiresIn: process.env.JWT_EXPIRES_IN }, // Define o tempo de expiração do token JWT
    }),
    })
  ], // Importa o módulo UserModule para este módulo
  controllers: [AuthController], // Define os controladores fornecidos por este módulo, que inclui apenas AuthController
  providers: [AuthService] // Define os serviços fornecidos por este módulo, que inclui apenas AuthService
})
export class AuthModule {} // Define a classe AuthModule como um módulo da aplicação
