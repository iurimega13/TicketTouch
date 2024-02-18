import { Test, TestingModule } from '@nestjs/testing'; // Importa os módulos Test e TestingModule do NestJS
import { AuthService } from './auth.service'; // Importa o serviço AuthService

describe('AuthService', () => { // Descreve os testes para o AuthService
  let service: AuthService; // Declara uma variável para armazenar uma instância de AuthService

  beforeEach(async () => { // Define uma função a ser executada antes de cada teste
    const module: TestingModule = await Test.createTestingModule({ // Cria um módulo de teste usando Test.createTestingModule
      providers: [AuthService], // Define os provedores a serem incluídos no módulo de teste
    }).compile(); // Compila o módulo de teste

    service = module.get<AuthService>(AuthService); // Obtém uma instância do serviço AuthService
  });

  it('should be defined', () => { // Define um teste
    expect(service).toBeDefined(); // Verifica se o serviço está definido
  });
});
