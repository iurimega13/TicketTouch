import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Definir o prefixo global para todas as rotas
  app.setGlobalPrefix('api');

  // Configuração do CORS
  app.enableCors({
    origin: 'http://localhost:3000', // Substitua com a URL do seu frontend
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Métodos HTTP permitidos
    credentials: true, // Permitir envio de cookies ou outros headers de autenticação
  });

  // Iniciar a aplicação na porta 3001
  await app.listen(3001);
}
bootstrap();
