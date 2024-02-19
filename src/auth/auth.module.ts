import { Module } from '@nestjs/common'; // Importa o decorator Module do NestJS
import { AuthController } from './auth.controller'; // Importa o controlador AuthController
import { AuthService } from './auth.service'; // Importa o serviço AuthService
import { UserModule } from 'src/users/user.module'; // Importa o módulo UserModule
import { JwtModule } from '@nestjs/jwt'; // Importa o módulo JwtModule do NestJS

@Module({ 
  imports: [UserModule, // Importa o módulo UserModule para este módulo
    JwtModule.registerAsync({ // Registra o módulo JWT de forma assíncrona, permitindo a configuração de forma dinâmica
      useFactory: () => ({ // Define uma função de fábrica para criar as opções de configuração do módulo JWT
        global: true, // Define o escopo global para o módulo JWT
        secret: process.env.JWT_SECRET, // Define a chave secreta para assinar o token JWT, obtida do ambiente
        signOptions: { expiresIn: process.env.JWT_EXPIRES_IN }, // Define as opções de assinatura do token JWT, incluindo o tempo de expiração
    }),
    })
  ], 
  controllers: [AuthController], // Define os controladores fornecidos por este módulo, que inclui apenas AuthController
  providers: [AuthService] // Define os serviços fornecidos por este módulo, que inclui apenas AuthService
})
export class AuthModule {} // Define a classe AuthModule como um módulo da aplicação
