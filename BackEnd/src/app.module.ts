import { Module } from '@nestjs/common'; // Importa o decorator Module do NestJS
import { AppController } from './app.controller'; // Importa o controlador AppController
import { AppService } from './app.service'; // Importa o serviço AppService
import { UserModule } from './users/user.module'; // Importa o módulo UserModule
import { TicketsModule } from './tickets/tickets.module'; // Importa o módulo TicketsModule
import { NotificationsModule } from './notifications/notifications.module'; // Importa o módulo NotificationsModule
import { ConfigModule, ConfigService } from '@nestjs/config'; // Importa o módulo ConfigModule do NestJS
import { TypeOrmModule } from '@nestjs/typeorm'; // Importa o módulo TypeOrmModule do NestJS
import { EquipmentsModule } from './equipments/equipments.module'; // Importa o módulo EquipmentsModule
import { AuthModule } from './auth/auth.module'; // Importa o módulo AuthModule
import { APP_GUARD } from '@nestjs/core';  // Importa o APP_GUARD do NestJS
// import { RolesGuard } from './guards/roles.guards'; // Importa o guard RolesGuard
import { TicketCategoriesModule } from './ticket-categories/ticket-categories.module'; // Importa o módulo TicketCategoriesModule
import { AttachmentsModule } from './attachments/attachments.module'; // Importa o módulo AttachmentsModule
import { TicketChangesModule } from './ticket-changes/ticket-changes.module'; // Importa o módulo TicketChangesModule
import { SlasModule } from './slas/slas.module'; // Importa o módulo SlasModule
import { FaqsModule } from './faqs/faqs.module'; // Importa o módulo FaqsModule
import { DepartamentsModule } from './departaments/departaments.module';
import { UnitsModule } from './units/units.module';

@Module({
  imports: [
    // Configuração do ambiente e banco de dados
    ConfigModule.forRoot({
      isGlobal: true, // Define que o módulo é global
      envFilePath: ['../.env'], // Define o arquivo de ambiente a ser carregado
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        database: configService.get('DATABASE_NAME'), // Nome do banco de dados
        host: configService.get('DATABASE_HOST'), // Host do banco de dados
        password: configService.get('DATABASE_PASSWORD'), // Senha do banco de dados
        port: Number(configService.get('DATABASE_PORT')), // Porta do banco de dados
        username: configService.get('DATABASE_USER'), // Nome de usuário do banco de dados
        synchronize: false, // Sincroniza automaticamente o esquema do banco de dados com as entidades
        entities: ['dist/**/*.entity{.ts,.js}'], // Localização das entidades
      }),
    }),
    
    // Importação dos módulos
    UserModule, TicketsModule, NotificationsModule, AuthModule, TicketCategoriesModule, AttachmentsModule, TicketChangesModule, SlasModule, FaqsModule, EquipmentsModule, UnitsModule, DepartamentsModule
  ],
  controllers: [AppController], // Controladores fornecidos pelo módulo
  providers: [AppService,
    /* {
      provide: APP_GUARD,
      useClass: RolesGuard,
    }, */
  ], 
})

export class AppModule { } // Define a classe AppModule como módulo principal da aplicação
