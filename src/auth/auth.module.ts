import { Module } from '@nestjs/common'; // Importa o decorator Module do NestJS
import { AuthController } from './auth.controller'; // Importa o controlador AuthController
import { AuthService } from './auth.service'; // Importa o serviço AuthService
import { UserModule } from 'src/users/user.module'; // Importa o módulo UserModule

@Module({ // Define o módulo AuthModule
  imports: [UserModule], // Importa o módulo UserModule para este módulo
  controllers: [AuthController], // Define os controladores fornecidos por este módulo, que inclui apenas AuthController
  providers: [AuthService] // Define os serviços fornecidos por este módulo, que inclui apenas AuthService
})
export class AuthModule {} // Define a classe AuthModule como um módulo da aplicação
