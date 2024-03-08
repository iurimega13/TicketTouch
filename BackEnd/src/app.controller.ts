import { Controller, Get } from '@nestjs/common'; // Importa decorators e módulos do NestJS
import { AppService } from './app.service'; // Importa o serviço AppService

@Controller() // Define este como o controlador principal
export class AppController {
  constructor(private readonly appService: AppService) {} // Injeta o serviço AppService no construtor

  @Get() // Define um método GET para a rota raiz
  getHello(): string {
    return this.appService.getHello(); // Retorna a mensagem de boas-vindas obtida do serviço AppService
  }
}
