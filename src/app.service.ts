import { Injectable } from '@nestjs/common'; // Importa o decorator Injectable do NestJS

@Injectable() // Indica que a classe é um serviço injetável
export class AppService {
  getHello(): string {
    return 'Isso é o inicio!'; // Retorna uma mensagem de boas-vindas
  }
}
