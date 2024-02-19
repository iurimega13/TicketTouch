import { Module } from '@nestjs/common'; // Importa o decorator Module do NestJS
import { AppController } from './app.controller'; // Importa o controlador AppController
import { AppService } from './app.service'; // Importa o serviço AppService
import { UserModule } from './users/user.module'; // Importa o módulo UserModule
import { AdminsModule } from './users/admins.module'; // Importa o módulo AdminsModule
import { TechniciansModule } from './users/technicians.module'; // Importa o módulo TechniciansModule
import { TicketsModule } from './tickets/tickets.module'; // Importa o módulo TicketsModule
import { NotificationsModule } from './notifications/notifications.module'; // Importa o módulo NotificationsModule
import { ConfigModule } from '@nestjs/config'; // Importa o módulo ConfigModule do NestJS
import { TypeOrmModule } from '@nestjs/typeorm'; // Importa o módulo TypeOrmModule do NestJS
import { EquipmentsModule } from './equipaments/equipments.module'; // Importa o módulo EquipmentsModule
import { AuthModule } from './auth/auth.module'; // Importa o módulo AuthModule

@Module({
  imports: [
    // Configuração do ambiente e banco de dados
    ConfigModule.forRoot({
      isGlobal: true, // Define que o módulo é global
      envFilePath: ['.env.development.local'], // Define o arquivo de ambiente a ser carregado
    }),
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'postgres', // Tipo do banco de dados
        database: process.env.DB_DATABASE, // Nome do banco de dados
        host: process.env.DB_HOST, // Host do banco de dados
        password: process.env.DB_PASSWORD, // Senha do banco de dados
        port: parseInt(process.env.DB_PORT), // Porta do banco de dados
        username: process.env.DB_USERNAME, // Nome de usuário do banco de dados
        synchronize: false, // Sincroniza automaticamente o esquema do banco de dados com as entidades
        entities: ['dist/**/*.entity{.ts,.js}'], // Localização das entidades
      }),
    }),
    // Importação dos módulos
    UserModule, AdminsModule, TechniciansModule, TicketsModule, NotificationsModule, AuthModule
  ],
  controllers: [AppController], // Controladores fornecidos pelo módulo
  providers: [AppService], // Serviços fornecidos pelo módulo
})

export class AppModule {} // Define a classe AppModule como módulo principal da aplicação
